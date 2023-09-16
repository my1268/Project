import React, { useEffect, useState } from "react";
import PageCover from "../features/PageCover";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import reviewPost from "./ReviewPost.module.css";
import demoImage from "../../assets/images/놀이공원.png";
import CardList from "../../UI/Card/CardList";
import PlannerModal from "../../UI/Modal/PlannerModal";
import Overlay from "../../UI/Modal/Overlay";
import axios from "axios";

function ReviewPost() {
  const [openModal, setOpenModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [reviewTitle, setReviewTitle] = useState("");
  const [placeList, setPlaceList] = useState([
    {
      inquiry: 0,
      title: "리뷰 제목1",
      nickName: "작성자",
      date: "날짜",
      image: demoImage,
    },
    {
      inquiry: 0,
      title: "리뷰 제목2",
      nickName: "작성자",
      date: "날짜",
      image: demoImage,
    },
    {
      inquiry: 0,
      title: "리뷰 제목3",
      nickName: "작성자",
      date: "날짜",
      image: demoImage,
    },
  ]);

  useEffect(() => {
    const getReview = async () => {
      try {
        const response = await axios.get("/api/upload-review");
        const reviewData = response.data;
        const id = Date.now();
        const newListItem = {
          inquiry: 0,
          id: id,
          nickName: reviewData.nickName,
          title: reviewData.title,
          date: reviewData.date,
          image: demoImage,
        };
        setPlaceList([...placeList, newListItem]);
        setReviewTitle(reviewData.title);
      } catch (error) {
        console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    getReview();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilteredItems();
  };

  const updateFilteredItems = () => {
    const filteredList = placeList.filter((item) =>
      item.title.includes(searchKeyword)
    );
    setFilteredItems(filteredList);
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
        <CardList
          inquiryCounting={true}
          placeList={filteredItems.length > 0 ? filteredItems : placeList}
          onClick={() => setOpenModal(true)}
        />
      </div>
      {openModal && (
        <>
          <PlannerModal
            reviewTitle={reviewTitle}
            subTitle="플래너 요약"
            showTimeTable={true}
            showSection={true}
            onClick={() => setOpenModal(false)}
            showReviewReadOnly={true}
          />
          <Overlay onClick={() => setOpenModal(false)} />
        </>
      )}
    </>
  );
}

export default ReviewPost;
