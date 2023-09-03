import React, { useEffect, useState } from "react";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import Memo from "../../UI/Form/Memo";
import PageCover from "../features/PageCover";
import making from "./MakingPlanner.module.css";
import form from "../../UI/Form/Form.module.css";
import { getToken } from "../Tokens/getToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReviewWrite() {
  const [selectPlanner, setSelectPlanner] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  //const [plannerOptions, setPlannerOptions] = useState([]);
  const [nickName, setNickName] = useState("");
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");

  const navigate = useNavigate();
  const token = getToken();

  const PlannerChange = (e) => {
    setSelectPlanner(e.target.value);
  };

  const FileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviewsArray = [...imagePreviews];
    files.forEach((file) => imagePreviewsArray.push(URL.createObjectURL(file)));
    setImagePreviews(imagePreviewsArray);
  };

  const plannerOptions = [
    { value: "플래너1" },
    { value: "플래너2" },
    { value: "플래너3" },
  ];

  useEffect(() => {
    const getPlanners = async () => {
      try {
        if (token) {
          const getName = await axios.get("/member/info");
          //  const response = await axios.get("/api/get-planners"); //예시 URL
          const userNickName = getName.data;
          //  const newPlanners = response.data;
          setNickName(userNickName.nickName);
          //  setPlannerOptions(newPlanners);
        }
      } catch (error) {
        console.error("플래너 정보를 가져오는 중 오류 발생:", error);
      }
    };
    getPlanners();
  }, [token]);

  const handleReviewSubmit = async () => {
    try {
      //  const formData = new FormData();
      if (!title || !selectPlanner) {
        alert("제목과 플래너 선택은 필수 입력 항목입니다.");
        return;
      }
      //  const currentDate = new Date();
      //  const year = currentDate.getFullYear();
      //  const month = currentDate.getMonth() + 1;
      //  const day = currentDate.getDate();
      //  formData.append("nickName", nickName);
      //  formData.append("title", title);
      //  formData.append("reviewText", reviewText);
      //  formData.append("selectPlanner", selectPlanner);
      //  imagePreviews.forEach((index) => {
      //   const file = imagePreviews[index];
      //   formData.append(`image${index}`, file);
      //  });
      //  formData.append("year", year);
      //  formData.append("month", month);
      //  formData.append("day", day);
      //  const response = await axios.post("/api/upload-review", formData); //예시 URL
      //  if (response.status === 200) {
      //    console.log("서버 응답 데이터:", response.data);
      alert("리뷰가 성공적으로 업로드되었습니다.");
      navigate("/reviewpost");
      //  } else {
      //    console.error("서버 응답 상태 코드가 200이 아닙니다.");
      //   }
    } catch (error) {
      console.error("리뷰 업로드 중 오류 발생:", error);
    }
  };

  return (
    <>
      <PageCover title="리뷰 작성" />
      <div className="not-layout">
        <div className="container">
          <form className={making.form}>
            <dl className={making.list}>
              <div className={making.item}>
                <dt>닉네임</dt>
                <dd>
                  <Base
                    value={nickName}
                    placeholder="내 닉네임"
                    readOnly
                    onChange={(e) => setNickName(e.target.value)}
                  />
                </dd>
              </div>
              <div className={making.item}>
                <dt>제목</dt>
                <dd>
                  <Base
                    value={title}
                    placeholder="제목"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </dd>
              </div>
              <div className={making.item}>
                <dt>플래너</dt>
                <dd>
                  <select
                    style={{ appearance: "none" }}
                    className={form.base}
                    value={selectPlanner}
                    onChange={PlannerChange}
                  >
                    <option value="">플래너를 선택하세요</option>
                    {plannerOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                </dd>
              </div>
              <div className={making.item}>
                <dt>리뷰 작성</dt>
                <dd>
                  <Memo
                    placeholder="리뷰"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </dd>
              </div>
              <div className={making.item}>
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
            </dl>
            <Primary text="리뷰 올리기" onClick={handleReviewSubmit} />
          </form>
        </div>
      </div>
    </>
  );
}

export default ReviewWrite;
