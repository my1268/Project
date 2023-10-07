import React, { useEffect, useState } from "react";
import PageCover from "../features/PageCover";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import Pagination from "../../UI/Pagination/Pagination";
import reviewPost from "./ReviewPost.module.css";
import Board from "../features/Board";
import PlannerModal from "../../UI/Modal/PlannerModal";
import Overlay from "../../UI/Modal/Overlay";
import axios from "axios";
/* eslint-disable */

function MyInquiry() {
  const [openModal, setOpenModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const [currentInquiryText, setCurrentInquiryText] = useState("");
  //const [list, setList] = useState([]);

  const [list, setList] = useState([
    { id: 1, title: "문의 1", date: "23.03.01 - 23.03.04", page: "/" },
    { id: 2, title: "문의 2", date: "23.02.01 - 23.02.04", page: "/" },
  ]);

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
      <PageCover title="문의 게시판" />
      <div className="layout">
        <div className="container">
          <form className={reviewPost.form} onSubmit={handleSearch}>
            <div className={reviewPost.formContainer}>
              <div className={reviewPost.searchContainer}>
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
