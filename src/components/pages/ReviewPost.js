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
import { useNavigate } from "react-router-dom";
//import { getToken } from "../Tokens/getToken";

function ReviewPost() {
  const [openModal, setOpenModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const navigate = useNavigate("");
  const ReviewWriteButton = () => {
    // const token = getToken();
    // if (token) {
    navigate("/reviewwrite");
    // } else {
    //   alert("리뷰를 작성하려면 로그인이 필요합니다.");
    // }
  };

  const placeList = [
    {
      inquiry: "조회 10",
      name: "리뷰 제목1",
      nickName: "작성자",
      date: "날짜",
      image: demoImage,
    },
    {
      inquiry: "조회 10",
      name: "리뷰 제목2",
      nickName: "작성자",
      date: "날짜",
      image: demoImage,
    },
    {
      inquiry: "조회 10",
      name: "리뷰 제목3",
      nickName: "작성자",
      date: "날짜",
      image: demoImage,
    },
    {
      inquiry: "조회 10",
      name: "리뷰 제목4",
      nickName: "작성자",
      date: "날짜",
      image: demoImage,
    },
    {
      inquiry: "조회 10",
      name: "리뷰 제목5",
      nickName: "작성자",
      date: "날짜",
      image: demoImage,
    },
    {
      inquiry: "조회 10",
      name: "리뷰 제목6",
      nickName: "작성자",
      date: "날짜",
      image: demoImage,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilteredItems();
  };

  const updateFilteredItems = () => {
    const filteredList = placeList.filter((item) =>
      item.name.includes(searchKeyword)
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
            <Ghost
              text="리뷰 작성하기"
              onClick={ReviewWriteButton}
              style={{ color: "#3da5f5" }}
            />
          </div>
        </form>
        <CardList
          placeList={filteredItems.length > 0 ? filteredItems : placeList}
          onClick={() => setOpenModal(true)}
        />
      </div>
      {openModal && (
        <>
          <PlannerModal
            title="리뷰 제목"
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
