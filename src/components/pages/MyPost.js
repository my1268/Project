import React, { useEffect, useState } from "react";
import Categories from "../features/Categories";
import PageCover from "../features/PageCover";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import Pagination from "../../UI/Pagination/Pagination";
import myPlanner from "./MyPlanner.module.css";
import Board from "../features/Board";
import PlannerModal from "../../UI/Modal/PlannerModal";
import Overlay from "../../UI/Modal/Overlay";
import axios from "axios";
/* eslint-disable */

function MyPost() {
  const [openModal, setOpenModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [list, setList] = useState([]);
  const [reviewTitle, setReviewTitle] = useState("");
  const [currentReviewText, setCurrentReviewText] = useState("");
  const [selectPlanner, setSelectPlanner] = useState("");
  const [image, setImage] = useState("");

  const handleDelete = async (itemToDelete) => {
    try {
      await axios.delete(`/api/planner/${itemToDelete.id}`); // 예시 URL
      const updatedList = list.filter((item) => item.id !== itemToDelete.id);
      const updatedFilteredList = filteredItems.filter(
        (item) => item.id !== itemToDelete.id
      );
      setList(updatedList);
      setFilteredItems(updatedFilteredList);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilteredItems();
  };

  const updateFilteredItems = () => {
    const filteredList = list.filter((item) =>
      item.title.includes(searchKeyword)
    );
    setFilteredItems(filteredList);
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
                setSelectPlanner(item.selectPlanner);
                setImage(item.image);
                setOpenModal(true);
              }}
              onDelete={handleDelete}
            />
          ) : (
            <p>
              현재 게시글이 없습니다. 상단에 리뷰 게시판 버튼을 눌러 리뷰를
              작성해보세요!
            </p>
          )}
          <Pagination />
        </div>
      </div>
      {openModal && (
        <>
          <PlannerModal
            reviewtitle={reviewTitle}
            subTitle="플래너 요약"
            currentReviewText={currentReviewText}
            selectPlanner={selectPlanner}
            image={image}
            showTimeTable={true}
            showSection={true}
            onClick={() => setOpenModal(false)}
            showUpdateButton={false}
          />
          <Overlay onClick={() => setOpenModal(false)} />
        </>
      )}
    </>
  );
}

export default MyPost;
