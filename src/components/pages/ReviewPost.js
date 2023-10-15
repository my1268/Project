import React, { useEffect, useState } from "react";
import PageCover from "../features/PageCover";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import reviewPost from "./ReviewPost.module.css";
import demoImage from "../../assets/images/놀이공원.png";
import CardList from "../../UI/Card/CardList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReviewPost() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [placeList, setPlaceList] = useState([]);
  const navigate = useNavigate();

  const addDateZeroPlus = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  useEffect(() => {
    async function getReview() {
      try {
        const response = await axios.get("http://localhost:8080/review/list", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.data) {
          console.log(response.data);
          const updateList = response.data.dtoList.map((plannerData) => {
            const dateArray = plannerData.date;
            const year = dateArray[0];
            const month = addDateZeroPlus(dateArray[1]);
            const day = addDateZeroPlus(dateArray[2]);
            const plannerDataDate = `${year}-${month}-${day} `;
            return {
              id: plannerData.id,
              title: plannerData.title,
              nickname: plannerData.nickname,
              date: plannerDataDate,
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
              <Primary
                isShortPrimary="true"
                text="검색"
                onClick={handleSearch}
              />
            </div>
          </div>
        </form>
        {placeList.length > 0 ? (
          <CardList
            placeList={placeList.map((item) => ({
              id: item.id,
              title: item.title,
              nickname: item.nickname,
              image: demoImage,
              date: item.date,
            }))}
            onClick={(id) => navigate(`/mypost/${id}`)}
          />
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
