import React, { useEffect, useState } from "react";
import Ghost from "../Button/Ghost";
import modal from "./Modal.module.css";
import { GrClose } from "react-icons/gr";
import CardList from "../Card/CardList";
import TimeTable from "../TimeTable/TimeTable";
import Base from "../Form/Base";
import Primary from "../Button/Primary";
import { BiEraser } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { getToken } from "../../components/Tokens/getToken";
import ReviewWriteModal from "./ReviewWriteModal";
import { useNavigate } from "react-router-dom";

function PlannerModal({
  onClick,
  title,
  subTitle,
  showSection,
  showPlace,
  showTimeTable,
  showMemo,
  showInquiry,
  showMemoReadOnly,
  showReviewReadOnly,
  showUpdateDeleteButton,
  currentMemoText,
  currentReviewText,
  reviewTitle,
  inquiryText,
  reviewWrite,
}) {
  const [placeList, setPlaceList] = useState([]);
  const [photoList, setPhotoList] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
  const [updatedMemoText, setUpdatedMemoText] = useState(currentMemoText);
  const [updatedReviewText, setUpdatedReviewText] = useState(currentReviewText);
  const [isMemoUpdate, setIsMemoUpdate] = useState(false);
  const [isReviewUpdate, setIsReviewUpdate] = useState(false);
  const [placeSearchData, setPlaceSearchData] = useState([]);
  const [showPlannerModal, setShowPlannerModal] = useState(false);
  const [showReviewWriteModal, setShowReviewWriteModal] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    const confirmMessage = window.confirm("수정 페이지로 이동하시겠습니까?");
    if (confirmMessage) {
      const editUrl = `/placesearch/${placeSearchData.id}`;
      navigate(editUrl);
    }
  };

  const handleshowReviewWriteModal = () => {
    const confirmMessage = window.confirm("리뷰를 작성하시겠습니까?");
    if (confirmMessage) {
      setShowPlannerModal(false);
      setShowReviewWriteModal(true);
    }
  };

  useEffect(() => {
    async function getPlanner() {
      try {
        const response = await axios.get(
          "http://localhost:3000/save-calendars" // 예시 URL
        );
        if (response.data.success) {
          const placeSearchData = response.data;
          const placeSearchItem = {
            id: placeSearchData.id,
            start: placeSearchData.start,
            startTime: placeSearchData.startTime,
            waypoints: placeSearchData.waypoints.map((waypointItem) => ({
              waypoint: waypointItem.waypoint,
              waypointTime: waypointItem.waypointTime,
            })),
          };
          const placeSearchImage = placeSearchData.map((plannerItem) => {
            return {
              startImage: plannerItem.startImage,
              waypoints: plannerItem.waypoints.map((waypointItem) => ({
                waypointImage: waypointItem.waypointImage,
              })),
            };
          });
          setPlaceSearchData(placeSearchItem);
          setPlaceList(placeSearchImage);
        } else {
          console.error(
            "Failed get data from placesearch:",
            response.data.errorMessage
          );
        }
      } catch (error) {
        console.error("Failed get data:", error);
      }
    }
    getPlanner();
  }, []);

  useEffect(() => {
    const getReview = async () => {
      try {
        const response = await axios.get("/api/upload-review");
        const reviewData = response.data;
        const newReviewListItems = reviewData.map((item, index) => ({
          id: index,
          image: item.Image,
        }));
        setPhotoList(newReviewListItems);
      } catch (error) {
        console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    getReview();
  }, []);

  const handleUpdatedMemo = async (updatedMemoText) => {
    try {
      const response = await axios.put("/api/memo", { updatedMemoText }); // 예시 URL
      if (response.data.success) {
        console.log("메모 수정 성공");
        alert("메모 수정 성공!");
      } else {
        console.error("메모 수정 실패:", response.data.errorMessage);
        alert("메모 수정 실패!");
      }
    } catch (error) {
      console.error("메모 수정 실패:", error);
    }
  };

  const handleUpdatedReview = async (updatedReviewText) => {
    try {
      const response = await axios.put("/api/review", { updatedReviewText }); // 예시 URL
      if (response.data.success) {
        console.log("리뷰 수정 성공");
        alert("리뷰 수정 성공!");
      } else {
        console.error("리뷰 수정 실패:", response.data.errorMessage);
        alert("리뷰 수정 실패!");
      }
    } catch (error) {
      console.error("리뷰 수정 실패:", error);
    }
  };

  const handleSaveComment = async (comment) => {
    if (comment.trim() === "") {
      return;
    }
    const token = getToken();
    if (!token) {
      alert("로그인 후에 댓글을 저장할 수 있습니다.");
      setCurrentComment("");
      return;
    }
    try {
      const getNickName = await axios.get("/api/user/nickname", {
        //예시 URL
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (getNickName.data.success) {
        const savedNickname = getNickName.data.nickname;
        const commentSave = await axios.post(
          "api/comment", // 예시 URL
          {
            comment: currentComment,
            nickname: savedNickname,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (commentSave.data.success) {
          setComments([...comments, { text: comment, time: new Date() }]);
          setCurrentComment("");
        } else {
          console.error("댓글 저장 실패:", commentSave.data.errorMessage);
        }
      } else {
        console.error("닉네임 가져오기 실패:", getNickName.data.errorMessage);
      }
    } catch (error) {
      console.error("댓글 저장 실패:", error);
    }
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

  return !showPlannerModal && !showReviewWriteModal ? (
    <aside className={`${modal.base} ${modal.posting} ${modal.overFlow}`}>
      <header className={modal.header}>
        {title && <h2>{title}</h2>}
        {reviewTitle && <h2>{reviewTitle}</h2>}
        {showUpdateDeleteButton && (
          <div className={modal.buttonWrapper}>
            <Ghost
              text="수정"
              style={{ color: "#3DA5F5" }}
              className="lg-only"
              onClick={handleEditClick}
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
        {reviewWrite && (
          <Ghost
            text="리뷰 작성하기"
            onClick={handleshowReviewWriteModal}
            style={{ color: "#3da5f5" }}
          />
        )}
      </header>
      <div className={modal.section}>
        <h3>{subTitle}</h3>
        {showTimeTable && <TimeTable placeSearchData={placeSearchData} />}
      </div>
      {showMemo && (
        <div className={modal.section}>
          <h3>메모</h3>
          <textarea
            className={modal.memoTextArea}
            value={updatedMemoText}
            readOnly={showMemoReadOnly || !isMemoUpdate}
            onChange={(e) => setUpdatedMemoText(e.target.value)}
          />
          <div className={modal.saveButton}>
            {!showMemoReadOnly && !isMemoUpdate ? (
              <Ghost
                style={{ color: "#3DA5F5" }}
                text="메모 수정"
                onClick={() => setIsMemoUpdate(true)}
              />
            ) : isMemoUpdate ? (
              <Primary
                isShortPrimary="true"
                text="저장"
                onClick={() => {
                  handleUpdatedMemo();
                  setIsMemoUpdate(false);
                }}
              />
            ) : null}
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
            value={updatedReviewText}
            onChange={(e) => setUpdatedReviewText(e.target.value)}
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
                  handleUpdatedReview();
                  setIsReviewUpdate(false);
                }}
              />
            ) : null}
          </div>
          <div className={modal.section}>
            <h3>사진</h3>
            <CardList photoList={photoList} />
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
      {showInquiry && (
        <div className={modal.inquiryContainer}>
          <h4 className={modal.inquiryContent}>문의 내용: {inquiryText}</h4>
          <h4 className={modal.inquiryContent}>관리자 답변:</h4>
        </div>
      )}
    </aside>
  ) : (
    <ReviewWriteModal
      onClick={() => setShowReviewWriteModal(false)}
      placeSearchData={placeSearchData}
    />
  );
}

export default PlannerModal;
