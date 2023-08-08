import React from "react";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import Memo from "../../UI/Form/Memo";
import PageCover from "../features/PageCover";
import making from "./MakingPlanner.module.css";
import { useNavigate } from "react-router-dom";

function MakingPlanner() {
  const navigate = useNavigate("");
  const placeSearchButton = () => {
    navigate("/placesearch");
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
                  <Base placeholder="제목" />
                </dd>
              </div>
              <div className={making.item}>
                <dt>메모</dt>
                <dd>
                  <Memo placeholder="메모를 입력하세요" />
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
