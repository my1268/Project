import React, { useState } from "react";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import Memo from "../../UI/Form/Memo";
import PageCover from "../features/PageCover";
import making from "./MakingPlanner.module.css";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../components/Tokens/getToken";
import axios from "axios";
import Ghost from "../../UI/Button/Ghost";

const MakingReview = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();
  const token = getToken();

  const previousButtonClick = () => {
    navigate(-1);
  };

  const FileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviewsArray = [...imagePreviews];
    files.forEach((file) => imagePreviewsArray.push(URL.createObjectURL(file)));
    setImagePreviews(imagePreviewsArray);
  };

  const handleReviewSubmit = async () => {
    const placeData = JSON.parse(localStorage.getItem("placeData"));
    try {
      const formData = new FormData();
      if (!title) {
        alert("리뷰 제목은 필수 입력 항목입니다.");
        return;
      }
      formData.append("title", title);
      formData.append("content", content);
      formData.append("placeData", JSON.stringify(placeData));
      imagePreviews.forEach((file, index) => {
        formData.append(`image${index}`, file);
      });
      for (const [title, content] of formData.entries()) {
        console.log(title, content);
      }
      const response = await axios.post(
        "http://localhost:8080/review/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        console.log("서버 응답 데이터:", response.data);
        alert("리뷰가 성공적으로 업로드되었습니다.");
        navigate("/reviewpost");
      } else {
        console.error("서버 응답 상태 코드가 200이 아닙니다.");
      }
      localStorage.removeItem("placeData");
    } catch (error) {
      console.error("리뷰 업로드 중 오류 발생:", error);
    }
  };

  return (
    <>
      <PageCover title="리뷰 만들기" />
      <div className="not-layout">
        <div className="container">
          <Ghost text="이전으로" onClick={previousButtonClick} />
          <form className={making.form}>
            <dl className={making.list}>
              <div className={making.item}>
                <dt>제목</dt>
                <dd>
                  <Base
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </dd>
              </div>
              <div className={making.item}>
                <dt>리뷰 메모</dt>
                <dd>
                  <Memo
                    placeholder="메모를 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </dd>
              </div>
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
                          width: "190px",
                          height: "121px",
                          margin: "2px",
                        }}
                      />
                    ))}
                  </dd>
                </div>
              )}
            </dl>

            <Primary
              text="리뷰 올리기"
              onClick={handleReviewSubmit}
              style={{ marginBottom: "8px" }}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default MakingReview;
