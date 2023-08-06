import React, { useState } from "react";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import Memo from "../../UI/Form/Memo";
import PageCover from "../features/PageCover";
import making from "./MakingPlanner.module.css";
import form from "../../UI/Form/Form.module.css";

function ReviewWrite() {
  const [selectPlanner, setSelectPlanner] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);

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
    { value: "planner1", label: "플래너1" },
    { value: "planner2", label: "플래너2" },
    { value: "planner3", label: "플래너3" },
  ];
  return (
    <>
      <PageCover title="리뷰 작성" />
      <div className="not-layout">
        <div className="container">
          <form className={making.form}>
            <dl className={making.list}>
              <div className={making.item}>
                <dt>제목</dt>
                <dd>
                  <Base placeholder="제목" />
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
                        {option.label}
                      </option>
                    ))}
                  </select>
                </dd>
              </div>
              <div className={making.item}>
                <dt>리뷰 작성</dt>
                <dd>
                  <Memo placeholder="리뷰" />
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
            <Primary text="리뷰 올리기" />
          </form>
        </div>
      </div>
    </>
  );
}

export default ReviewWrite;
