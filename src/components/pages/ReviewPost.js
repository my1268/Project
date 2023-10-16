import React, { useEffect, useState } from "react";
import PageCover from "../features/PageCover";
import Base from "../../UI/Form/Base";
import reviewPost from "./ReviewPost.module.css";
import demoImage from "../../assets/images/놀이공원.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../UI/Card/Card";

function ReviewPost() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [placeList, setPlaceList] = useState([]);
  const navigate = useNavigate();
  const addDateZeroPlus = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };
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
  let url = `/reviewpost?page=${pageParam}&size=${sizeParam}&type=T&keyword=${searchKeyword}`;

  useEffect(() => {
    async function getReview() {
      try {
        const response = await axios.get(
          `http://localhost:8080/review/list?page=${pageParam}&size=${sizeParam}&type=T&keyword=${keywordParam}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
          const updateList = response.data.dtoList.map((plannerData) => {
            const dateArray = plannerData.date;
            const year = dateArray[0];
            const month = addDateZeroPlus(dateArray[1]);
            const day = addDateZeroPlus(dateArray[2]);
            const plannerDataDate = `${year}-${month}-${day} `;
            const thumbnailUrl = plannerData.thumbnailUrl;
            console.log(thumbnailUrl);
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
    getReview();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <PageCover title="리뷰 게시판" />
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
          <div>
            {placeList.map((item) => (
              <div key={item.id}>
                <p>{item.title}</p>
                <p>{item.nickname}</p>
                <img
                  src={item.thumbnailUrl}
                  alt={item.thumbnailUrl}
                  style={{ width: "400px", height: "400px" }}
                />
                <button onClick={() => navigate(`/mypost/${item.id}`)}>
                  Post
                </button>
              </div>
            ))}
            {/* <Card
              placeList={placeList.map((item) => ({
                id: item.id,
                title: item.title,
                nickname: item.nickname,
                image: demoImage,
                date: item.date,
              }))}
              onClick={(id) => navigate(`/mypost/${id}`)}
              uiWrite={true}
            /> */}
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

export default ReviewPost;
