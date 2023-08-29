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

function MyComment() {
  const [openModal, setOpenModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const [list, setList] = useState([
    { title: "플래너 제목- 댓글 1", date: "23.03.01 - 23.03.04", page: "/" },
    { title: "플래너 제목- 댓글 2", date: "23.02.01 - 23.02.04", page: "/" },
  ]);

  const handleDelete = (itemDelete) => {
    const updatedList = list.filter((item) => item !== itemDelete);
    const updatedFilteredList = filteredItems.filter(
      (item) => item !== itemDelete
    );
    setList(updatedList);
    setFilteredItems(updatedFilteredList);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilteredItems();
  };

  const updateFilteredItems = () => {
    const filteredList = list.filter((item) =>
      item.title.includes(searchKeyword)
    );
    setFilteredItems(filteredList);
  };

  return (
    <>
      <PageCover title="마이페이지" />
      <div className="layout">
        <Categories />
        <div className="container">
          <form className={myPlanner.form} onSubmit={handleSearch}>
            <Base
              placeholder="플래너를 검색하세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Primary isShortPrimary="true" text="검색" onClick={handleSearch} />
          </form>
          {filteredItems.length > 0 || list.length > 0 ? (
            <Board
              list={filteredItems.length > 0 ? filteredItems : list}
              title="댓글 목록"
              onClick={() => setOpenModal(true)}
              onDelete={handleDelete}
            />
          ) : (
            <p>
              현재 댓글이 없습니다. 상단에 리뷰 게시판 버튼을 눌러 댓글을
              작성해보세요!
            </p>
          )}
          <Pagination />
        </div>
      </div>
      {openModal && (
        <>
          <PlannerModal
            title="플래너 제목"
            onClick={() => setOpenModal(false)}
            showComment={true}
          />
          <Overlay onClick={() => setOpenModal(false)} />
        </>
      )}
    </>
  );
}

export default MyComment;
