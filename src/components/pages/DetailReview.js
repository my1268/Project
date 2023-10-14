import React, { useEffect, useState } from "react";
import Ghost from "../../UI/Button/Ghost";
import CardList from "../../UI/Card/CardList";
import axios from "axios";
import { getToken } from "../../components/Tokens/getToken";
import { useNavigate } from "react-router-dom";
import detailReview from "./DetailReview.module.css";
import { useParams } from "react-router-dom";

function DetailReview() {
  const [placeList, setPlaceList] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState();
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
