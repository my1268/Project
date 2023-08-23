import React, { useState } from "react";
import Categories from "../features/Categories";
import PageCover from "../features/PageCover";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import Pagination from "../../UI/Pagination/Pagination";
import myPlanner from "./MyPlanner.module.css";
import Board from "../features/Board";
import PlannerModal from "../../UI/Modal/PlannerModal";
import Overlay from "../../UI/Modal/Overlay";

function MyPlanner() {
  const [openModal, setOpenModal] = useState(false);

  const list = [
    { title: "플래너 제목 1", date: "23.03.01 - 23.03.04", page: "/" },
    { title: "플래너 제목 2", date: "23.02.01 - 23.02.04", page: "/" },
  ];

  return (
    <>
      <PageCover title="마이페이지" />
      <div className="layout">
        <Categories />

        <div className="container">
          <form className={myPlanner.form}>
            <Base placeholder="플래너를 검색하세요" />
            <Primary isShortPrimary="true" text="검색" />
          </form>

          <Board
            list={list}
            title="플래너 목록"
            onClick={() => setOpenModal(true)}
          />
          <Pagination />
        </div>
      </div>

      {openModal && (
        <>
          <PlannerModal
            title="플래너 제목"
            subTitle="타임 테이블"
            showTimeTable={true}
            showMemo={true}
            showPlace={true}
            onClick={() => setOpenModal(false)}
          />
          <Overlay onClick={() => setOpenModal(false)} />
        </>
      )}
    </>
  );
}

export default MyPlanner;
