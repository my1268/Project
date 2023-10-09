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
import { getToken } from "../Tokens/getToken";

function MyPlanner() {
  const [openModal, setOpenModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [list, setList] = useState([]);
  const token = getToken();

  const handleDelete = async (itemToDelete) => {
    try {
      await axios.delete(`/api/planner/${itemToDelete.id}`);
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
        const response = await axios.get(
          "http://localhost:8080/planner/view/my_planner?page=1&size=10",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        const updateList = response.data.dtoList.map((plannerData) => {
          const dateArray = plannerData.date;
          const plannerDataDate = `${dateArray[0]}-${dateArray[1]}-0${dateArray[2]}`;
          return {
            title: plannerData.title,
            date: plannerDataDate,
          };
        });
        setList([...list, ...updateList]);
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
                      date: item.date,
                    }))
                  : list.map((item) => ({ title: item.title, date: item.date }))
              }
              title="플래너 목록"
              onClick={() => {
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
            subTitle="타임 테이블"
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
