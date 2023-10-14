import React, { useEffect, useState } from "react";
import Ghost from "../../UI/Button/Ghost";
import CardList from "../../UI/Card/CardList";
import axios from "axios";
import { getToken } from "../../components/Tokens/getToken";
import { useNavigate } from "react-router-dom";
import detailReview from "./DetailReview.module.css";
import { useParams } from "react-router-dom";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import { BiEraser } from "react-icons/bi";

function DetailReview() {
  const [nickname, setNickname] = useState("");
  const [placeList, setPlaceList] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState();
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
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

  useEffect(() => {
    async function getPlanner() {
      try {
        const response = await axios.get(`http://localhost:8080/review/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        console.log(response.data);
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

  const handleSaveComment = async (comment) => {
    const local = localStorage.getItem("reviewData");
    console.log(local);
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
          content: currentComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log(response);
      if (response.data) {
        setComments([...comments, { text: comment, time: new Date() }]);
        setCurrentComment("");
      } else {
        console.error("댓글 저장 실패:", response.data.errorMessage);
      }
    } catch (error) {
      console.error("댓글 저장 실패:", error);
    }
  };

  const handleDeleteComment = (index, commentText) => {
    return () => {
      const deleteComment = window.confirm(
        `"${commentText}" 댓글을 삭제하시겠습니까?`
      );
      if (deleteComment) {
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);
      }
    };
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
              className={`${detailReview.commentContainer} ${detailReview}`}
            >
              <p>
                {nickname} : {comment.text} ---
                {comment.time.toLocaleString()}
              </p>
              <BiEraser
                className={detailReview.deleteButton}
                onClick={handleDeleteComment(
                  comments.length - 1 - index,
                  comment.text
                )}
              />
            </div>
          ))}
      </div>
      <div>
        <h3>리뷰 사진</h3>
        <CardList placeList={placeList} />
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
