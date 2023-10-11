import React, { useEffect, useState } from "react";
import Ghost from "../../UI/Button/Ghost";
import { GrClose } from "react-icons/gr";
import CardList from "../../UI/Card/CardList";
import TimeTable from "../../UI/TimeTable/TimeTable";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import { BiEraser } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";
import { getToken } from "../../components/Tokens/getToken";
import { useNavigate } from "react-router-dom";

function DetailPlanner({
  onClick,
  subTitle,
  showMemoReadOnly,
  currentMemoText,
}) {
  const [placeList, setPlaceList] = useState([]);
  const [updatedMemoText, setUpdatedMemoText] = useState(currentMemoText);
  const [placeSearchData, setPlaceSearchData] = useState([]);
  const navigate = useNavigate();
  const token = getToken();

  const handleEditClick = () => {
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

  const handleDelete = async () => {
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
        <h2>title</h2>
        <div>
          <Ghost
            text="수정"
            style={{ color: "#3DA5F5" }}
            className="lg-only"
            onClick={handleEditClick}
          />
          <Ghost
            text="삭제"
            style={{ color: "#F86D7D" }}
            className="lg-only"
            onClick={() => handleDelete()}
          />
          <button type="button" onClick={handleEditClick}>
            <MdEdit />
          </button>
          <button type="button" onClick={() => handleDelete()}>
            <AiTwotoneDelete />
          </button>
        </div>
        <button type="button" className={`sm-only `} onClick={onClick}>
          <GrClose />
        </button>
      </header>
      <div>
        <h3>{subTitle}</h3>
        <TimeTable placeSearchData={placeSearchData} />
      </div>
      <div>
        <h3>메모</h3>
        <textarea
          value={updatedMemoText}
          readOnly={showMemoReadOnly}
          onChange={(e) => setUpdatedMemoText(e.target.value)}
        />
      </div>
      <div>
        <h3>장소 정보</h3>
        <CardList placeList={placeList} />
      </div>
    </aside>
  );
}

export default DetailPlanner;
