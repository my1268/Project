import React, { useState } from "react";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import Memo from "../../UI/Form/Memo";
import PageCover from "../features/PageCover";
import making from "./MakingPlanner.module.css";
import { useNavigate } from "react-router-dom";
import Date from "../../UI/Form/Date";

const MakingPlanner = () => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");

  const navigate = useNavigate("");

  const handleFirstDateChange = (date) => {
    setFirstDate(date);
    localStorage.setItem("firstDate", date);
  };

  const handleLastDateChange = (date) => {
    setLastDate(date);
    localStorage.setItem("lastDate", date);
  };

  const placeSearchButton = async () => {
    if (title.trim().length === 0) {
      alert("제목을 입력해주세요!");
    } else {
      try {
        const requestData = {
          title,
          comment,
          firstDate,
          lastDate,
        };
        localStorage.setItem("requestData", JSON.stringify(requestData));
        navigate("/placesearch");
      } catch (error) {
        console.error("Error creating planner:", error);
      }
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
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </dd>
              </div>
              <div className={making.item}>
                <dt>First Date</dt>
                <dd>
                  <Date value={firstDate} onChange={handleFirstDateChange} />
                </dd>
              </div>
              <div className={making.item}>
                <dt>Last Date</dt>
                <dd>
                  <Date value={lastDate} onChange={handleLastDateChange} />
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
};

export default MakingPlanner;
