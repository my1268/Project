import React, { useState, useEffect } from "react";
import modal from "./Modal.module.css";
import Primary from "../Button/Primary";
import { GrClose } from "react-icons/gr";
import form from "../Form/Form.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../components/Tokens/getToken";
import making from "../../components/pages/MakingPlanner.module.css";
import TimeTable from "../TimeTable/TimeTable";

function ReviewWriteModal({ onClick, onCloseModal, style, placeSearchData }) {
  const [nickName, setNickName] = useState("");
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();
  const token = getToken();

  const FileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviewsArray = [...imagePreviews];
    files.forEach((file) => imagePreviewsArray.push(URL.createObjectURL(file)));
    setImagePreviews(imagePreviewsArray);
  };

  useEffect(() => {
    const getNickName = async () => {
      try {
        if (token) {
          const response = await axios.get("/member/info");
          const getNickName = response.data;
          setNickName(getNickName.nickName);
        }
      } catch (error) {
        console.error("닉네임 정보를 가져오는 중 오류 발생:", error);
      }
    };
    getNickName();
  }, [token]);

  const handleReviewSubmit = async () => {
    try {
      const formData = new FormData();
      if (!title) {
        alert("리뷰 제목은 필수 입력 항목입니다.");
        return;
      }
      const currentDate = new Date();
      const year = String(currentDate.getFullYear());
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      formData.append("nickName", nickName);
      formData.append("title", title);
      formData.append("reviewText", reviewText);
      imagePreviews.forEach((file, index) => {
        formData.append(`image${index}`, file);
      });
      formData.append("date", `${year}-${month}-${day}`);
      const response = await axios.post("/api/upload-review", formData); //예시 URL
      if (response.status === 200) {
        console.log("서버 응답 데이터:", response.data);
        alert("리뷰가 성공적으로 업로드되었습니다.");
        navigate("/reviewpost");
      } else {
        console.error("서버 응답 상태 코드가 200이 아닙니다.");
      }
    } catch (error) {
      console.error("리뷰 업로드 중 오류 발생:", error);
    }
  };

  return (
    <aside className={`${modal.base} ${modal.member} ${modal.overFlow}`}>
      <div className={modal.reviewWriteTitle}>리뷰 작성</div>
      <TimeTable placeSearchData={placeSearchData} />
      <div style={style}>
        <input
          className={`${form.base} ${form.inputMargin}`}
          style={{ marginTop: "30px" }}
          value={nickName}
          placeholder="내 닉네임"
          readOnly
          onChange={(e) => setNickName(e.target.value)}
        />
        <input
          className={`${form.base} ${form.inputMargin}`}
          value={title}
          placeholder="리뷰 제목"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={`${form.base} ${form.inputMargin}`}
          placeholder="리뷰 메모"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div className={making.item} style={{ marginBottom: "30px" }}>
          <dt>사진 추가</dt>
          <dd>
            <input type="file" multiple onChange={FileChange} />
          </dd>
        </div>
        {imagePreviews.length > 0 && (
          <div className={making.item}>
            <dt>선택 사진</dt>
            <dd>
              {imagePreviews.map((previewUrl, index) => (
                <img
                  key={index}
                  src={previewUrl}
                  alt={`Preview ${index}`}
                  style={{
                    width: "196px",
                    height: "131px",
                    margin: "3px",
                  }}
                />
              ))}
            </dd>
          </div>
        )}
      </div>
      <Primary text="리뷰 올리기" onClick={handleReviewSubmit} />
      <button
        type="button"
        className={`sm-only ${modal.close}`}
        onClick={onClick}
      >
        <GrClose />
      </button>
    </aside>
  );
}

export default ReviewWriteModal;
