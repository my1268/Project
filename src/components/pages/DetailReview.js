import React, { useEffect, useState } from "react";
import Ghost from "../../UI/Button/Ghost";
import axios from "axios";
import { getToken } from "../../components/Tokens/getToken";
import { useNavigate } from "react-router-dom";
import detailReview from "./DetailReview.module.css";
import { useParams } from "react-router-dom";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import { BiEraser } from "react-icons/bi";
import Card from "../../UI/Card/Card";

function DetailReview() {
  const [nickname, setNickname] = useState("");
  const [placeList, setPlaceList] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(); //메모
  const [comments, setComments] = useState([]);
  const [editedComment, setEditedComment] = useState("");
  const [editingComment, setEditingComment] = useState(false);
  const [currentComment, setCurrentComment] = useState(""); //입력 댓글 리셋
  const token = getToken();
  const navigate = useNavigate();
  const { id } = useParams();

  const handlePreviousButtonClick = () => {
    navigate(-1);
    localStorage.removeItem("reviewData");
  };

  const handleEditButtonClick = () => {
    const confirmReview = window.confirm(`${title}플래너를 수정하고 싶나요?`);
    if (confirmReview) {
      navigate("/makingreview");
    }
  };
  //닉네임불러오기
  useEffect(() => {
    async function getNickName() {
      try {
        await axios
          .get("http://localhost:8080/member/info", {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setNickname(response.data.nickname);
          })
          .catch((error) => {
            console.error("Failed get nickname");
          });
      } catch (error) {
        console.error("Error get nickname:", error);
      }
    }
    getNickName();
  }, []);
  //리뷰데이터 불러오기
  useEffect(() => {
    async function getPlanner() {
      try {
        const response = await axios.get(`http://localhost:8080/review/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const placeData = {
          title: response.data.title,
          content: response.data.content,
        };
        setPlaceList([placeData]);
        setTitle(response.data.title);
        setContent(response.data.content);
        localStorage.setItem("reviewData", JSON.stringify(response.data));
      } catch (error) {
        console.error("Failed get data:", error);
      }
    }
    getPlanner();
  }, []);
  //리뷰삭제
  const handleDeleteButtonClick = async () => {
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:8080/review/delete?reviewId=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.data) {
        alert("삭제 되었습니다.");
        navigate(-1);
        console.log("Success delete");
      } else {
        console.error("Failed to delete planner:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to delete planner:", error);
    }
  };
  //댓글저장
  const handleSaveComment = async (comment) => {
    const local = JSON.parse(localStorage.getItem("reviewData"));
    if (comment.trim() === "") {
      return;
    }
    if (!token) {
      alert("로그인 후에 댓글을 저장할 수 있습니다.");
      setCurrentComment("");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/reply/write",
        {
          reviewId: local.id,
          email: local.email,
          content: currentComment, //메모
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.data) {
        try {
          const response = await axios.get(
            `http://localhost:8080/reply/list/${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (response.data) {
            const dataList = response.data.map((data) => data.content);
            console.log(dataList);
            setComments([...comments, ...dataList]);
            setCurrentComment("");
          }
        } catch (error) {
          console.error("댓글 저장 실패:", error);
        }
      } else {
        console.error("댓글 저장 실패:", response.data.errorMessage);
      }
    } catch (error) {
      console.error("댓글 저장 실패:", error);
    }
  };
  //댓글삭제
  const handleDeleteComment = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/reply/delete?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.data) {
        alert("삭제 되었습니다.");
        console.log("Success delete");
      } else {
        console.error("Failed to delete comment:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };
  //댓글수정
  const handleEditComment = async () => {
    try {
      const response = await axios.put("http://localhost:8080/reply/update", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.data) {
        alert("수정 되었습니다.");
        console.log("Success update");
      } else {
        console.error("Failed to update comment:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };
  return (
    <aside>
      <header>
        <div className={detailReview.header}>
          <Ghost
            className={detailReview.ghostText}
            text="뒤로"
            onClick={handlePreviousButtonClick}
          />
          <p>{title}</p>
          <Ghost
            text="수정하기"
            style={{ color: "#3DA5F5" }}
            className={detailReview.ghostText}
            onClick={handleEditButtonClick}
          />
        </div>
      </header>
      <div className={`${detailReview.marginBottom} ${detailReview.marginTop}`}>
        <h3>리뷰 메모</h3>
        <textarea value={content} className={detailReview.memoTextArea} />
      </div>
      <div className={detailReview.section}>
        <h3>댓글</h3>
        <div
          className={`${detailReview.saveButton} ${detailReview.marginBottom}`}
        >
          <Base
            placeholder="댓글을 입력하세요"
            value={currentComment}
            maxLength={60}
            onChange={(e) => setCurrentComment(e.target.value)}
          />
          <Primary
            isShortPrimary="true"
            text="저장"
            onClick={() => {
              handleSaveComment(currentComment);
            }}
          />
        </div>
      </div>
      <div>
        {comments
          .slice()
          .reverse()
          .map((comment, index) => (
            <div
              key={index}
              className={`${detailReview.commentContainer} ${detailReview.commentPosition} `}
            >
              {editingComment === index ? (
                <>
                  <input
                    type="text"
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      handleEditComment(index, editedComment);
                      setEditingComment(null);
                      setEditedComment("");
                    }}
                  >
                    저장
                  </button>
                </>
              ) : (
                <>
                  <p>
                    {nickname} : {comment}
                  </p>
                  <BiEraser
                    className={detailReview.deleteButton}
                    onClick={() => handleDeleteComment()}
                  />
                  <button onClick={() => setEditingComment(index)}>수정</button>
                </>
              )}
            </div>
          ))}
      </div>
      <div>
        <h3>리뷰 사진</h3>
        <Card placeList={placeList} />
      </div>
      <div className={detailReview.marginTopButton}>
        <Ghost
          text="삭제"
          style={{ color: "#F86D7D" }}
          className={detailReview.ghostText}
          onClick={() => handleDeleteButtonClick()}
        />
      </div>
    </aside>
  );
}

export default DetailReview;
