import React, { useEffect, useState } from "react";
import Ghost from "../Button/Ghost";
import modal from "./Modal.module.css";
import { GrClose } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import CardList from "../Card/CardList";
import demoImage from "../../assets/images/놀이공원.png";
import TimeTable from "../TimeTable/TimeTable";
import Base from "../Form/Base";
import Primary from "../Button/Primary";
import { BiEraser } from "react-icons/bi";
import { BiDotsHorizontal, BiHappyHeartEyes, BiAngry } from "react-icons/bi";
import axios from "axios";
//import axios from "axios";
//import { getToken } from "../../components/Tokens/getToken";

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
  //token,
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

  const [isMemoUpdate, setIsMemoUpdate] = useState(false);
  const [currentMemo, setCurrentMemo] = useState("");
  const [isReviewUpdate, setIsReviewUpdate] = useState(false);
  const [currentReview, setCurrentReview] = useState("");

  const openEmotionModal = (index) => {
    setEmotionModalIndex(index);
    setIsOpenEmotionModal(index);
  };

  const closeEmotionModal = () => {
    setEmotionModalIndex(null);
    setIsOpenEmotionModal(false);
  };

  useEffect(() => {
    async function getMemo() {
      try {
        const response = await axios.get("/api/title/memo"); // 예시 URL
        if (response.data.success) {
          const makingPlannerData = response.data.data;
          setCurrentMemo(makingPlannerData.memo);
        } else {
          console.error("메모 가져오기 실패:", response.data.errorMessage);
        }
      } catch (error) {
        console.error("메모 가져오기 실패:", error);
      }
    }
    getMemo();
  }, []);

  const handleUpdateMemo = async (currentMemo) => {
    try {
      //   const response = await axios.put("/api/memo", { currentMemo }); // 예시 URL
      //    if (response.data.success) {
      //      console.log("메모 수정 성공");
      alert("메모 수정 성공!");
      //    } else {
      //      console.error("메모 수정 실패:", response.data.errorMessage);
      //      alert("메모 수정 실패!");
      //    }
    } catch (error) {
      console.error("메모 수정 실패:", error);
    }
  };

  useEffect(() => {
    async function getReviews() {
      try {
        const response = await axios.get("/api/reviews"); // 예시 URL
        if (response.data.success) {
          const reviewsData = response.data.data;
          setCurrentReview(reviewsData.review);
        } else {
          console.error("리뷰 가져오기 실패:", response.data.errorMessage);
        }
      } catch (error) {
        console.error("리뷰 가져오기 실패:", error);
      }
    }
    getReviews();
  }, []);

  const handleUpdateReview = async (currentReview) => {
    try {
      //   const response = await axios.put("/api/review", { currentReview }); // 예시 URL
      //   if (response.data.success) {
      //     console.log("리뷰 수정 성공");
      alert("리뷰 수정 성공!");
      //   } else {
      //    console.error("리뷰 수정 실패:", response.data.errorMessage);
      //     alert("리뷰 수정 실패!");
      //    }
    } catch (error) {
      console.error("리뷰 수정 실패:", error);
    }
  };

  // if (!token) {
  //   alert("로그인 후에 모달창을 클릭할 수 있습니다.");
  //   return;
  // }

  const handleSaveComment = async (comment, emotionType) => {
    if (comment.trim() === "") {
      return;
    }
    //  const token = getToken();
    //  if (!token) {
    //    alert("로그인 후에 댓글을 저장할 수 있습니다.");
    //    setCurrentComment("");
    //    return;
    //  }
    //  try {
    //    const getNickName = await axios.get("/api/user/nickname", {
    //      //예시 URL
    //      headers: {
    //        Authorization: `Bearer ${token}`,
    //      },
    //    });
    //   if (getNickName.data.success) {
    //     const savedNickname = getNickName.data.nickname;
    //     const commentSave = await axios.post(
    //       "api/comment", // 예시 URL
    //       {
    //        comment: currentComment,
    //       nickname: savedNickname,
    //      emotionType: emotionType,
    //    },
    //   {
    //    headers: {
    //     Authorization: `Bearer ${token}`,
    //  },
    //  }
    //  );
    //  if (commentSave.data.success) {
    const newEmotionClickData = { happy: 0, bad: 0 };
    setComments([...comments, { text: comment, time: new Date() }]);
    setEmotionClick([...emotionClick, newEmotionClickData]);
    setCurrentComment("");
    closeEmotionModal();
    //    } else {
    //     console.error("댓글 저장 실패:", commentSave.data.errorMessage);
    //  }
    // } else {
    //   console.error("닉네임 가져오기 실패:", getNickName.data.errorMessage);
    //  }
    //  } catch (error) {
    //   console.error("댓글 저장 실패:", error);
    //  }
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
      closeEmotionModal();
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
            <button type="button" className={`sm-only ${modal.edit}`}>
              <MdEdit />
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
          <textarea
            className={modal.memoTextArea}
            value={currentMemo}
            readOnly={!isMemoUpdate}
            onChange={(e) => setCurrentMemo(e.target.value)}
          />
          <div className={modal.saveButton}>
            {!isMemoUpdate && (
              <Ghost
                style={{ color: "#3DA5F5" }}
                text="메모 수정"
                onClick={() => setIsMemoUpdate(true)}
              />
            )}
            {isMemoUpdate && (
              <Primary
                isShortPrimary="true"
                text="저장"
                onClick={() => {
                  handleUpdateMemo(currentMemo);
                  setIsMemoUpdate(false);
                }}
              />
            )}
          </div>
        </div>
      )}
      {showSection && (
        <div className={modal.section}>
          <h3>리뷰</h3>
          <textarea
            className={modal.reviewTextArea}
            placeholder="리뷰"
            readOnly={showReviewReadOnly || !isReviewUpdate}
            value={currentReview}
            onChange={(e) => setCurrentReview(e.target.value)}
          />
          <div className={modal.saveButton}>
            {!showReviewReadOnly && !isReviewUpdate ? (
              <Ghost
                style={{ color: "#3DA5F5" }}
                text="리뷰 수정"
                onClick={() => setIsReviewUpdate(true)}
              />
            ) : isReviewUpdate ? (
              <Primary
                isShortPrimary="true"
                text="저장"
                onClick={() => {
                  handleUpdateReview(currentReview);
                  setIsReviewUpdate(false);
                }}
              />
            ) : null}
          </div>
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
                      {/* {savedNickname}: {comment.text} ---*/}내 닉네임:
                      {comment.text} ---
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
          {/* {savedNickname}: {comment.text} */}
          <h4>문의 내용</h4>
          <h4>관리자 내용</h4>
        </div>
      )}
    </aside>
  );
}

export default PlannerModal;
