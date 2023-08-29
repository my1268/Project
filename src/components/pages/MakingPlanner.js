import React, { useState } from "react";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import Memo from "../../UI/Form/Memo";
import PageCover from "../features/PageCover";
import making from "./MakingPlanner.module.css";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

function MakingPlanner() {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");

  const navigate = useNavigate("");

  const placeSearchButton = async () => {
    if (title.trim().length === 0) {
      alert("제목을 한 글자 이상 입력해주세요!");
    } else {
      // try {
      // const requestData = {
      //  title: title,
      //  memo: memo,
      // };
      //  const response = await axios.post(
      //    "http://localhost:3000/create-planner", // 예시 URL
      //      requestData
      //    );
      //   console.log("Planner created:", response.data);
      navigate("/placesearch");
      //   } catch (error) {
      //     console.error("Error creating planner:", error);
      //  }
    }
  };

  return (
    <>
      <PageCover title="플래너 만들기" />
      <div className="not-layout">
        <div className="container">
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
                <dt>메모</dt>
                <dd>
                  <Memo
                    placeholder="메모를 입력하세요"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                  />
                </dd>
              </div>
            </dl>
            <Primary
              text="플래너 만들기"
              onClick={placeSearchButton}
              style={{ marginBottom: "8px" }}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default MakingPlanner;
