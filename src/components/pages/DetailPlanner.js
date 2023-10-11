import React, { useEffect, useState } from "react";
import Ghost from "../../UI/Button/Ghost";
import CardList from "../../UI/Card/CardList";
import TimeTable from "../../UI/TimeTable/TimeTable";
import axios from "axios";
import { getToken } from "../../components/Tokens/getToken";
import { useNavigate } from "react-router-dom";
import detailPlanner from "./DetailPlanner.module.css";

function DetailPlanner({ onClick, subTitle }) {
  const [placeList, setPlaceList] = useState([]);
  const [comment, setComment] = useState();
  const [placeSearchData, setPlaceSearchData] = useState([]);
  const navigate = useNavigate();
  const token = getToken();

  const handlePreviousClick = () => {
    navigate(-1);
  };

  const handleEditButtonClick = () => {
    const confirmMessage = window.confirm("수정 페이지로 이동하시겠습니까?");
    if (confirmMessage) {
      const editUrl = `http://localhost:8080/planner/edit/${placeSearchData.id}`;
      navigate(editUrl);
    }
  };

  // useEffect(() => {
  //   async function getPlanner() {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/planner/get/{id}` // 예시 URL
  //       );
  //       if (response.data) {
  //         const placeSearchData = response.data;
  //         const placeSearchItem = {
  //           start: placeSearchData.start,
  //           startTime: placeSearchData.startTime,
  //           waypoints: placeSearchData.waypoints.map((waypointItem) => ({
  //             waypoint: waypointItem.waypoint,
  //             waypointTime: waypointItem.waypointTime,
  //           })),
  //         };
  //         const placeSearchImage = placeSearchData.map((plannerItem) => {
  //           return {
  //             startImage: plannerItem.startImage,
  //             waypoints: plannerItem.waypoints.map((waypointItem) => ({
  //               waypointImage: waypointItem.waypointImage,
  //             })),
  //           };
  //         });
  //         setPlaceSearchData(placeSearchItem);
  //         setPlaceList(placeSearchImage);
  //       } else {
  //         console.error(
  //           "Failed get data from placesearch:",
  //           response.data.errorMessage
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Failed get data:", error);
  //     }
  //   }
  //   getPlanner();
  // }, []);

  const handleDeleteButtonClick = async () => {
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await axios.delete(
        //  `http://localhost:8080/planner/delete?plannerId=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.data) {
        alert("삭제 되었습니다.");
        navigate("/mymenu");
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
            onClick={handlePreviousClick}
          />
          <p>제목</p>
          <Ghost className={detailPlanner.ghostText} text="리뷰 작성" />
        </div>
      </header>
      <div
        className={`${detailPlanner.marginBottom} ${detailPlanner.marginTop}`}
      >
        <h3>타임테이블</h3>
        <TimeTable placeSearchData={placeSearchData} />
      </div>
      <div>
        <h3>메모</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
          onClick={handleEditButtonClick}
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
