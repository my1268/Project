import React, { useEffect, useState } from "react";
import Ghost from "../../UI/Button/Ghost";
import CardList from "../../UI/Card/CardList";
import TimeTable from "../../UI/TimeTable/TimeTable";
import axios from "axios";
import { getToken } from "../../components/Tokens/getToken";
import { useNavigate } from "react-router-dom";
import detailPlanner from "./DetailPlanner.module.css";
import { useParams } from "react-router-dom";

function DetailPlanner() {
  const [placeList, setPlaceList] = useState([]);
  const [savePlaceData, setSavePlaceData] = useState([]);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState();
  const token = getToken();
  const navigate = useNavigate();
  const { id } = useParams();

  const handlePreviousButtonClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function getPlanner() {
      try {
        const response = await axios.get(
          `http://localhost:8080/planner/get/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        console.log(response.data);
        const placeData = {
          title: response.data.title,
          comment: response.data.comment,
        };
        setPlaceList([placeData]);
        setTitle(response.data.title);
        setComment(response.data.comment);
        setSavePlaceData(response.data.schedule);
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
        `http://localhost:8080/planner/delete?plannerId=${id}`,
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
        <div className={detailPlanner.header}>
          <Ghost
            className={detailPlanner.ghostText}
            text="뒤로"
            onClick={handlePreviousButtonClick}
          />
          <p>{title}</p>
          <Ghost className={detailPlanner.ghostText} text="리뷰 작성" />
        </div>
      </header>
      <div
        className={`${detailPlanner.marginBottom} ${detailPlanner.marginTop}`}
      >
        <h3>타임테이블</h3>
        <TimeTable savePlaceData={savePlaceData} />
      </div>
      <div>
        <h3>메모</h3>
        <textarea
          value={comment}
          className={`${detailPlanner.marginBottom} ${detailPlanner.memoTextArea}`}
        />
      </div>
      <div>
        <h3>장소 정보</h3>
        <CardList placeList={placeList} />
      </div>
      <div className={detailPlanner.marginTopButton}>
        <Ghost
          text="수정"
          style={{ color: "#3DA5F5" }}
          className={detailPlanner.ghostText}
          // onClick={handleEditButtonClick}
        />
        <Ghost
          text="삭제"
          style={{ color: "#F86D7D" }}
          className={detailPlanner.ghostText}
          onClick={() => handleDeleteButtonClick()}
        />
      </div>
    </aside>
  );
}

export default DetailPlanner;
