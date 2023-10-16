import React, { useEffect, useState } from "react";
import PageCover from "../features/PageCover";
import Base from "../../UI/Form/Base";
import reviewPost from "./ReviewPost.module.css";
import demoImage from "../../assets/images/놀이공원.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../UI/Card/Card";

function PlannerPost() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [placeList, setPlaceList] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let pageParam = "1";
  if (queryParams.get("page") != null) {
    pageParam = queryParams.get("page");
  }
  let keywordParam = "";
  if (queryParams.get("keyword") != null) {
    keywordParam = queryParams.get("keyword");
  }
  let sizeParam = "";
  if (queryParams.get("size") != null) {
    sizeParam = queryParams.get("size");
  }
  let url = `/plannerpost?page=${pageParam}&size=${sizeParam}&type=T&keyword=${searchKeyword}`;

  const addDateZeroPlus = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  useEffect(() => {
    async function getPlanner() {
      try {
        const response = await axios.get(
          `http://localhost:8080/planner/view/all_planner?page=${pageParam}&size=${sizeParam}&type=T&keyword=${keywordParam}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
          console.log(response.data);
          const updateList = response.data.dtoList.map((plannerData) => {
            const dateArray = plannerData.date;
            const year = dateArray[0];
            const month = addDateZeroPlus(dateArray[1]);
            const day = addDateZeroPlus(dateArray[2]);
            const plannerDataDate = `${year}-${month}-${day} `;
            const thumbnailUrl = plannerData.thumbnailUrl;
            return {
              id: plannerData.id,
              title: plannerData.title,
              nickname: plannerData.nickname,
              date: plannerDataDate,
              thumbnailUrl: thumbnailUrl,
            };
          });
          setPlaceList([...placeList, ...updateList]);
        } else {
          console.error("Failed get title:", response.data.errorMessage);
        }
      } catch (error) {
        console.error("Failed get data:", error);
      }
    }
    getPlanner();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <PageCover title="플래너 게시판" />
      <div className="container">
        <form className={reviewPost.form} onSubmit={handleSearch}>
          <div className={reviewPost.formContainer}>
            <div className={reviewPost.searchContainer}>
              <Base
                placeholder="제목을 검색하세요"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <a
                className={reviewPost.search}
                href={url}
                style={{ color: "white", fontWeight: "700" }}
              >
                검색
              </a>
            </div>
          </div>
        </form>
        {placeList.length > 0 ? (
          <div style={{ display: "flex", gap: "20px" }}>
            {placeList.map((item) => (
              <div key={item.id} style={{ position: "relative" }}>
                <a href={`/planner/plannerList/${item.id}`}>
                  <img
                    src={item.thumbnailUrl}
                    alt={item.thumbnailUrl}
                    className={reviewPost.image}
                  />
                </a>
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{item.title}</span>
                  <span>{item.date}</span>
                </p>
                <p>작성자: {item.nickname}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>
            유저 리뷰 플래너가 없습니다. 내 플래너 버튼을 눌러 처음으로 플래너를
            작성해보세요!
          </p>
        )}
      </div>
    </>
  );
}

export default PlannerPost;
