import React from "react";
import Ghost from "../Button/Ghost";
import modal from "./Modal.module.css";
import { GrClose } from "react-icons/gr";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import CardList from "../Card/CardList";
import demoImage from "../../assets/images/놀이공원.png";
import TimeTable from "../TimeTable/TimeTable";
import Base from "../Form/Base";
import Primary from "../Button/Primary";

function PlannerModal({
  onClick,
  title,
  subTitle,
  showSection,
  showPlace,
  showTimeTable,
  showMemo,
  showComment,
  showReviewReadOnly,
  showUpdateDeleteButton,
}) {
  const placeList = [
    {
      name: "놀이공원1",
      date: "3월 10일 12:00 - 13:00",
      address: "서울특별시 강남구",
      image: demoImage,
    },
    {
      name: "놀이공원2",
      date: "3월 10일 12:00 - 13:00",
      address: "서울특별시 강남구",
      image: demoImage,
    },
    {
      name: "놀이공원3",
      date: "3월 10일 12:00 - 13:00",
      address: "서울특별시 강남구",
      image: demoImage,
    },
  ];
  return (
    <aside className={`${modal.base} ${modal.posting} ${modal.overFlow}`}>
      <header className={modal.header}>
        <h2>{title}</h2>
        {showUpdateDeleteButton && (
          <div className={modal.buttonWrapper}>
            <Ghost
              text="수정"
              style={{ color: "#3DA5F5" }}
              className="lg-only"
            />
            <Ghost
              text="삭제"
              style={{ color: "#F86D7D" }}
              className="lg-only"
            />
            <button type="button" className={`sm-only ${modal.edit}`}>
              <MdEdit />
            </button>
            <button type="button" className={`sm-only ${modal.delete}`}>
              <AiTwotoneDelete />
            </button>
          </div>
        )}
        <button
          type="button"
          className={`sm-only ${modal.close}`}
          onClick={onClick}
        >
          <GrClose />
        </button>
      </header>
      <div className={modal.section}>
        <h3>{subTitle}</h3>
        {showTimeTable && <TimeTable />}
      </div>
      {showMemo && (
        <div className={modal.section}>
          <h3>메모</h3>
          <textarea className={modal.memoTextArea} />
        </div>
      )}
      {showSection && (
        <div className={modal.section}>
          <h3>리뷰</h3>
          <textarea
            className={modal.reviewTextArea}
            placeholder="리뷰"
            readOnly={showReviewReadOnly}
          />
          <div className={modal.section}>
            <h3>사진</h3>
            <CardList placeList={placeList.map(({ image }) => ({ image }))} />
          </div>
          <div className={modal.section}>
            <h3>댓글</h3>
            <div className={modal.saveButton}>
              <Base placeholder="댓글을 입력하세요" />
              <Primary isShortPrimary="true" text="저장" />
            </div>
          </div>
        </div>
      )}
      {showPlace && (
        <div className={modal.section}>
          <h3>장소 정보</h3>
          <CardList placeList={placeList} />
        </div>
      )}
      {showComment && (
        <div>
          <h4>내 닉네임: 댓글 내용</h4>
          <h4>내 닉네임: 댓글 내용</h4>
          <h4>내 닉네임: 댓글 내용</h4>
        </div>
      )}
    </aside>
  );
}

export default PlannerModal;
