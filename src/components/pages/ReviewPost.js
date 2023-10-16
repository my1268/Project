import React, { useEffect, useState } from "react";
import PageCover from "../features/PageCover";
import Base from "../../UI/Form/Base";
import reviewPost from "./ReviewPost.module.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import page from "../../UI/Pagination/Pagination.module.css";

function ReviewPost() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [placeList, setPlaceList] = useState([]);
  const [pageList, setPageList] = useState([]);
  const addDateZeroPlus = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let pageParam = "1";
  if (queryParams.get("page") != null) {
    pageParam = queryParams.get("page");
  }
  let keywordParam = "";
  if (queryParams.get("keyword") != null) {
    keywordParam = queryParams.get("keyword");
  }
  let sizeParam = "";
  if (queryParams.get("size") != null) {
    sizeParam = queryParams.get("size");
  }
  let url = `/reviewpost?page=${pageParam}&size=${sizeParam}&type=T&keyword=${searchKeyword}`;

  useEffect(() => {
    async function getReview() {
      try {
        const response = await axios.get(
          `http://localhost:8080/review/list?page=${pageParam}&size=${sizeParam}&type=T&keyword=${keywordParam}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
          const pageDtoList = response.data.pageList.map((page) => {
            return page;
          });
          setPageList(pageDtoList);
          console.log(response.data);
          const updateList = response.data.dtoList.map((plannerData) => {
            const dateArray = plannerData.date;
            const year = dateArray[0];
            const month = addDateZeroPlus(dateArray[1]);
            const day = addDateZeroPlus(dateArray[2]);
            const plannerDataDate = `${year}-${month}-${day} `;
            const thumbnailUrl = plannerData.thumbnailUrl;
            return {
              id: plannerData.id,
              title: plannerData.title,
              nickname: plannerData.nickname,
              date: plannerDataDate,
              thumbnailUrl: thumbnailUrl,
            };
          });
          setPlaceList([...placeList, ...updateList]);
        } else {
          console.error("Failed get title:", response.data.errorMessage);
        }
      } catch (error) {
        console.error("Failed get data:", error);
      }
    }
    getReview();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <PageCover title="리뷰 게시판" />
      <div className="container">
        <form className={reviewPost.form} onSubmit={handleSearch}>
          <div className={reviewPost.formContainer}>
            <div className={reviewPost.searchContainer}>
              <Base
                placeholder="제목을 검색하세요"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <a
                className={reviewPost.search}
                href={url}
                style={{ color: "white", fontWeight: "700" }}
              >
                검색
              </a>
            </div>
          </div>
        </form>
        {placeList.length > 0 ? (
          <div style={{ display: "flex", gap: "20px" }}>
            {placeList.map((item) => (
              <div key={item.id} style={{ position: "relative" }}>
                <a href={`/mypost/${item.id}`}>
                  <img
                    src={`http://localhost:8080/file/display?fileName=${item.thumbnailUrl}`}
                    alt={item.thumbnailUrl}
                    className={reviewPost.image}
                  />
                </a>
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{item.title}</span>
                  <span>{item.date}</span>
                </p>
                <p>작성자: {item.nickname}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>
            유저 리뷰 플래너가 없습니다. 내 플래너 버튼을 눌러 처음으로 플래너를
            작성해보세요!
          </p>
        )}
        <div className={page.buttons}>
          <button className={page.chevron} type="button">
            <FiChevronLeft />
          </button>
          <div className={page.pages}>
            {pageList.map((page) => (
              <a
                href={`http://localhost:3000/reviewpost?page=${page}&size=${sizeParam}&type=T&keyword=${keywordParam}`}
              >
                {page}
              </a>
            ))}
          </div>
          <button className={page.chevron} type="button">
            <FiChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default ReviewPost;
