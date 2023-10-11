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
import Ghost from "../../UI/Button/Ghost";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/* eslint-disable */

function MyInquiry() {
  const [openModal, setOpenModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const [currentInquiryText, setCurrentInquiryText] = useState("");
  const [list, setList] = useState([]);

  const navigate = useNavigate("");
  const InquiryWriteButton = () => {
    navigate("/myinquirywrite");
  };

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
    async function getInquiry() {
      try {
        const response = await axios.get("/inquiry/url"); // 예시 URL
        if (response.data.success) {
          const inquiryData = response.data;
          const id = Date.now();
          const newListItem = {
            id: id,
            title: inquiryData.title,
            inquiryText: inquiryData.inquiryText,
            date: inquiryData.date,
          };
          setList([...list, newListItem]);
        } else {
          console.error("Failed get inquiry:", response.data.errorMessage);
        }
      } catch (error) {
        console.error("Failed get inquiry:", error);
      }
    }
    getInquiry();
  }, []);

  return (
    <>
      <PageCover title="마이페이지" />
      <div className="layout">
        <Categories />
        <div className="container">
          <form className={myPlanner.form} onSubmit={handleSearch}>
            <div className={myPlanner.formContainer}>
              <div className={myPlanner.searchContainer}>
                <Base
                  placeholder="문의를 검색하세요"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <Primary
                  isShortPrimary="true"
                  text="검색"
                  onClick={handleSearch}
                />
              </div>
              <Ghost
                text="문의 작성하기"
                onClick={() => {
                  InquiryWriteButton();
                }}
                style={{ color: "#3da5f5" }}
              />
            </div>
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
              title="문의 목록"
              onClick={(item) => {
                setCurrentInquiryText(item.inquiryText);
                setOpenModal(true);
              }}
              onDelete={handleDelete}
              deleteButton={true}
            />
          ) : (
            <p>현재 문의가 없습니다. 궁금한 것이 있다면 문의를 작성해보세요!</p>
          )}
          <Pagination />
        </div>
      </div>
      {openModal && (
        <>
          <PlannerModal
            inquiryText={currentInquiryText}
            onClick={() => setOpenModal(false)}
            showInquiry={true}
          />
          <Overlay onClick={() => setOpenModal(false)} />
        </>
      )}
    </>
  );
}

export default MyInquiry;
