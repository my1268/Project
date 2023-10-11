import React, { useEffect, useState } from "react";
import Categories from "../features/Categories";
import PageCover from "../features/PageCover";
import Base from "../../UI/Form/Base";
import Pagination from "../../UI/Pagination/Pagination";
import myPlanner from "./MyPlanner.module.css";
import Board from "../features/Board";
import axios from "axios";
import { getToken } from "../Tokens/getToken";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function MyPlanner() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [list, setList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = getToken();
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
  let url = `/planner/plannerList?page=${pageParam}&size=${sizeParam}&type=T&keyword=${searchKeyword}`;

  const handleSearch = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    async function getPlanner() {
      try {
        const response = await axios.get(
          `http://localhost:8080/planner/view/all_planner?page=1&size=${sizeParam}&type=T&keyword=${keywordParam}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        console.log(response.data);
        const updateList = response.data.dtoList.map((plannerData) => {
          const dateArray = plannerData.date;
          const plannerDataDate = `${dateArray[0]}-${dateArray[1]}-0${dateArray[2]} ${dateArray[3]}:0${dateArray[4]}:${dateArray[5]}`;
          return {
            id: plannerData.id,
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
  }, [id]);

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
            <a href={url}>검색</a>
          </form>
          {list.length > 0 ? (
            <Board
              list={list.map((item) => ({
                title: item.title,
                date: item.date,
                id: item.id,
              }))}
              title="플래너 목록"
              onClick={(id) => {
                navigate(`/planner/plannerList/${id}`);
              }}
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
    </>
  );
}

export default MyPlanner;
