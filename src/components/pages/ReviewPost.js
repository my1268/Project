import React, { useState } from "react";
import PageCover from "../features/PageCover";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import Ghost from "../../UI/Button/Ghost";
import reviewPost from "./ReviewPost.module.css";
import demoImage from "../../assets/images/놀이공원.png";
import CardList from "../../UI/Card/CardList";
import PlannerModal from "../../UI/Modal/PlannerModal";
import Overlay from "../../UI/Modal/Overlay";

function ReviewPost() {
  const [openModal, setOpenModal] = useState(false);
  const placeList = [
    {
      inquiry: "조회 10",
      name: "리뷰 제목",
      nickName: "작성자",
      date: "날짜",
      image: demoImage,
    },
    {
      inquiry: "조회 10",
      name: "리뷰 제목",
      nickName: "작성자",
      date: "날짜",
      image: demoImage,
    },
    {
      inquiry: "조회 10",
      name: "리뷰 제목",
      nickName: "작성자",
      date: "날짜",
      image: demoImage,
    },
    {
      inquiry: "조회 10",
      name: "리뷰 제목",
      nickName: "작성자",
      date: "날짜",
      image: demoImage,
    },
    {
      inquiry: "조회 10",
      name: "리뷰 제목",
      nickName: "작성자",
      date: "날짜",
      image: demoImage,
    },
    {
      inquiry: "조회 10",
      name: "리뷰 제목",
      nickName: "작성자",
      date: "날짜",
      image: demoImage,
    },
  ];
  return (
    <>
      <PageCover title="리뷰 게시판" />
      <div className="container">
        <form className={reviewPost.form}>
          <div className={reviewPost.formContainer}>
            <div className={reviewPost.searchContainer}>
              <Base placeholder="플래너를 검색하세요" />
              <Primary isShortPrimary="true" text="검색" />
            </div>
            <Ghost text="리뷰 작성하기" style={{ color: "#3da5f5" }} />
          </div>
        </form>
        <CardList placeList={placeList} />
      </div>
      {openModal && (
        <>
          <PlannerModal
            title="리뷰 제목"
            subTitle="플래너 요약"
            showTimeTable={true}
            showSection={true}
            onClick={() => setOpenModal(false)}
          />
          <Overlay onClick={() => setOpenModal(false)} />
        </>
      )}
    </>
  );
}

export default ReviewPost;
