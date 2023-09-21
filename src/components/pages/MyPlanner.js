import React, { useEffect, useState } from "react";
import Categories from "../features/Categories";
import PageCover from "../features/PageCover";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import Pagination from "../../UI/Pagination/Pagination";
import myPlanner from "./MyPlanner.module.css";
import Board from "../features/Board";
import PlannerModal from "../../UI/Modal/PlannerModal";
import Overlay from "../../UI/Modal/Overlay";
import axios from "axios";
/* eslint-disable */

function MyPlanner() {
  const [openModal, setOpenModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  //const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [currentMemoText, setCurrentMemoText] = useState("");

  const [list, setList] = useState([
    { id: 1, title: "플래너 1", date: "23.03.01 - 23.03.04", page: "/" },
    { id: 2, title: "플래너 2", date: "23.02.01 - 23.02.04", page: "/" },
  ]);

  const handleDelete = async (itemToDelete) => {
    try {
      await axios.delete(`/api/planner/${itemToDelete.id}`); // 예시 URL
      const updatedList = list.filter((item) => item.id !== itemToDelete.id);
      const updatedFilteredList = filteredItems.filter(
        (item) => item.id !== itemToDelete.id
      );
      setList(updatedList);
      setFilteredItems(updatedFilteredList);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
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

  useEffect(() => {
    async function getPlanner() {
      try {
        const response = await axios.get("/api/title/memo"); // 예시 UR
        if (response.data.success) {
          const plannerData = response.data;
          const id = Date.now();
          const newListItem = {
            id: id,
            title: plannerData.title,
            memo: plannerData.memo,
          };
          setList([...list, newListItem]);
          setTitle(plannerData.title);
        } else {
          console.error("Failed get title:", response.data.errorMessage);
        }
      } catch (error) {
        console.error("Failed get data:", error);
      }
    }
    getPlanner();
  }, []);

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
              list={
                filteredItems.length > 0
                  ? filteredItems.map((item) => ({
                      title: item.title,
                    }))
                  : list.map((item) => ({ title: item.title }))
              }
              title="플래너 목록"
              onClick={(item) => {
                setCurrentMemoText(item.memo);
                setOpenModal(true);
              }}
              onDelete={handleDelete}
              deleteButton={true}
            />
          ) : (
            <p>
              현재 플래너가 없습니다. 상단에 플래너 작성하기 버튼을 눌러
              플래너를 작성해보세요!
            </p>
          )}
          <Pagination />
        </div>
      </div>
      {openModal && (
        <>
          <PlannerModal
            title={title}
            subTitle="타임 테이블"
            currentMemoText={currentMemoText}
            showUpdateDeleteButton={true}
            showTimeTable={true}
            showMemo={true}
            showPlace={true}
            onClick={() => setOpenModal(false)}
            reviewWrite={true}
          />
          <Overlay onClick={() => setOpenModal(false)} />
        </>
      )}
    </>
  );
}

export default MyPlanner;
