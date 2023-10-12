import React, { useEffect, useState } from "react";
import Categories from "../features/Categories";
import PageCover from "../features/PageCover";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import Pagination from "../../UI/Pagination/Pagination";
import myPlanner from "./MyPlanner.module.css";
import Board from "../features/Board";
import axios from "axios";

function MyPost() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [list, setList] = useState([]);
  const [reviewTitle, setReviewTitle] = useState("");
  const [currentReviewText, setCurrentReviewText] = useState("");
  const [reviewimage, setReviewImage] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    async function getReview() {
      try {
        const response = await axios.get("/api/upload-review"); // 예시 URL
        if (response.data.success) {
          const reviewData = response.data;
          const id = Date.now();
          const newListItem = {
            id: id,
            nickName: reviewData.nickName,
            title: reviewData.title,
            reviewText: reviewData.reviewText,
            selectPlanner: reviewData.selectPlanner,
            image: reviewData.image,
            date: reviewData.date,
          };
          setList([...list, newListItem]);
          setReviewTitle(reviewData.title);
        } else {
          console.error("Failed get title:", response.data.errorMessage);
        }
      } catch (error) {
        console.error("Failed get data:", error);
      }
    }
    getReview();
  }, []);

  return (
    <>
      <PageCover title="마이페이지" />
      <div className="layout">
        <Categories />
        <div className="container">
          <form className={myPlanner.form} onSubmit={handleSearch}>
            <Base
              placeholder="플래너를 검색하세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Primary isShortPrimary="true" text="검색" onClick={handleSearch} />
          </form>
          {filteredItems.length > 0 || list.length > 0 ? (
            <Board
              list={
                filteredItems.length > 0
                  ? filteredItems.map((item) => ({
                      title: item.title,
                      date: item.date,
                    }))
                  : list.map((item) => ({ title: item.title, date: item.date }))
              }
              title="게시글 목록"
              onClick={(item) => {
                setCurrentReviewText(item.reviewText);
                setReviewImage(item.image);
              }}
            />
          ) : (
            <p>현재 게시글이 없습니다. 리뷰를 작성해보세요!</p>
          )}
          <Pagination />
        </div>
      </div>
    </>
  );
}

export default MyPost;
