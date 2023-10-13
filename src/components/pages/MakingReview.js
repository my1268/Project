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

  const FilePlus = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviewsArray = [...imagePreviews];

    files.forEach(async (file) => {
      const previewURL = URL.createObjectURL(file);
      imagePreviewsArray.push(previewURL);
      setImagePreviews(imagePreviewsArray);

      const formData = new FormData();
      formData.append("file", file);
      console.log("FormData에 추가된 파일:", formData.get("file"));
      try {
        const response = await axios.post(
          "http://localhost:8080/file/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );
        if (response.data) {
          console.log("파일 업로드 성공:", response.data);
        } else {
          console.error("파일 업로드 실패:", response.data);
        }
      } catch (error) {
        console.error("파일 업로드 중 오류 발생:", error);
      }
    });
  };

  const handleRemoveImage = async (index) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/file/remove",
        {
          imageUrl: imagePreviews[index],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.data) {
        console.log("파일 삭제 성공");
      } else {
        console.error("파일 삭제 실패");
      }
    } catch (error) {
      console.error("파일 삭제 중 오류 발생:", error);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const placeData = JSON.parse(localStorage.getItem("placeData"));
      let data = {
        title: title,
        content: content,
        email: placeData.email,
        plannerId: placeData.plannerId,
        thumbnailUrl: placeData.thumbnailUrl,
        reviewImageDTOList: [
          {
            id: 0,
            fileName: "string",
            uuid: "string",
            folderPath: "string",
            thumbnailUrl: "string",
            imageUrl: "string",
          },
        ],
      };
      const response = await axios.post(
        "http://localhost:8080/review/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.data) {
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
                  <input type="file" multiple onChange={FilePlus} />
                </dd>
              </div>
              {imagePreviews.length > 0 && (
                <div className={making.item}>
                  <dt>선택 사진</dt>
                  <dd>
                    {imagePreviews.map((previewUrl, index) => (
                      <div key={index}>
                        <img
                          key={index}
                          src={previewUrl}
                          alt={`Preview ${index}`}
                          style={{
                            width: "230px",
                            height: "130px",
                            margin: "2px",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                        >
                          x
                        </button>
                      </div>
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
