import React, { useState } from "react";
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
import { BiEraser } from "react-icons/bi";
import { BiDotsHorizontal, BiHappyHeartEyes, BiAngry } from "react-icons/bi";

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

  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
  const [isOpenEmotionModal, setIsOpenEmotionModal] = useState(false);
  const [emotionClick, setEmotionClick] = useState([]);
  const [emotionModalIndex, setEmotionModalIndex] = useState(null);
  const [selectedComment, setSelectedComment] = useState("");

  const openEmotionModal = (index) => {
    setEmotionModalIndex(index);
    setIsOpenEmotionModal(index);
  };

  const closeEmotionModal = () => {
    setEmotionModalIndex(null);
    setIsOpenEmotionModal(false);
  };

  const handleSaveComment = (comment) => {
    if (comment.trim() === "") {
      return;
    }
    setComments([...comments, { text: comment, time: new Date() }]);
    setEmotionClick([{ happy: 0, bad: 0 }, ...emotionClick]);
    setCurrentComment("");
    closeEmotionModal();
  };

  const handleDeleteComment = (index, commentText) => {
    return () => {
      const deleteComment = window.confirm(
        `"${commentText}" 댓글을 삭제하시겠습니까?`
      );
      if (deleteComment) {
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);
      }
    };
  };

  const handleEmotionClick = (commentIndex, emotionType) => {
    setEmotionClick((prevEmotion) => {
      const updatedEmotion = [...prevEmotion];
      if (!updatedEmotion[commentIndex]) {
        updatedEmotion[commentIndex] = { happy: 0, bad: 0 };
      }
      if (
        emotionType === "happy" &&
        updatedEmotion[commentIndex]["bad"] === 1
      ) {
        return updatedEmotion;
      }
      if (
        emotionType === "bad" &&
        updatedEmotion[commentIndex]["happy"] === 1
      ) {
        return updatedEmotion;
      }
      if (updatedEmotion[commentIndex][emotionType] === 0) {
        updatedEmotion[commentIndex][emotionType] = 1;
      } else {
        updatedEmotion[commentIndex][emotionType] = 0;
      }
      const otherEmotionType = emotionType === "happy" ? "bad" : "happy";
      updatedEmotion[commentIndex][otherEmotionType] = 0;
      return updatedEmotion;
    });
  };

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
            style={{ resize: "none" }}
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
              <Base
                placeholder="댓글을 입력하세요"
                value={currentComment}
                maxLength={28}
                onChange={(e) => setCurrentComment(e.target.value)}
              />
              <Primary
                isShortPrimary="true"
                text="저장"
                onClick={() => {
                  handleSaveComment(currentComment);
                }}
              />
            </div>
            <div>
              {comments
                .slice()
                .reverse()
                .map((comment, index) => (
                  <div key={index} className={modal.commentContainer}>
                    <p className={modal.commentText}>
                      내 닉네임: {comment.text} ---
                      {comment.time.toLocaleString()}
                    </p>
                    <BiEraser
                      className={modal.deleteButton}
                      onClick={handleDeleteComment(
                        comments.length - 1 - index,
                        comment.text
                      )}
                    />
                    {isOpenEmotionModal !== index && (
                      <BiDotsHorizontal
                        className={modal.optionButton}
                        onClick={() => {
                          openEmotionModal(index);
                          setSelectedComment(comment.text);
                        }}
                      />
                    )}
                    {emotionModalIndex === index && (
                      <div
                        className={modal.optionModal}
                        style={{
                          top: `calc(${87 + index}%)`,
                        }}
                      >
                        {emotionModalIndex === index && (
                          <div className={modal.commentContent}>
                            <p>{selectedComment}</p>
                          </div>
                        )}
                        <div className={modal.optionEmotions}>
                          <BiHappyHeartEyes
                            className={modal.optionButton}
                            onClick={() => handleEmotionClick(index, "happy")}
                          />
                          <p>{emotionClick[index]?.happy || 0}</p>
                          <BiAngry
                            className={modal.optionButton}
                            onClick={() => handleEmotionClick(index, "bad")}
                          />
                          <p>{emotionClick[index]?.bad || 0}</p>
                        </div>
                        <button
                          className={modal.closeOptionButton}
                          onClick={closeEmotionModal}
                        >
                          닫기
                        </button>
                      </div>
                    )}
                  </div>
                ))}
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
