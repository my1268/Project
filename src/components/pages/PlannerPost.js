import React, { useEffect, useState } from "react";
import PageCover from "../features/PageCover";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import reviewPost from "./ReviewPost.module.css";
import demoImage from "../../assets/images/놀이공원.png";
import CardList from "../../UI/Card/CardList";
import axios from "axios";
import { getToken } from "../Tokens/getToken";
import { useNavigate } from "react-router-dom";

function PlannerPost() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const token = getToken();
  const [placeList, setPlaceList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPlanner() {
      try {
        const response = await axios.get(
          "http://localhost:8080/planner/view/all_planner",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        if (response.data) {
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
          setPlaceList([...placeList, ...updateList]);
        } else {
          console.error("Failed get title:", response.data.errorMessage);
        }
      } catch (error) {
        console.error("Failed get data:", error);
      }
    }
    getPlanner();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilteredItems();
  };

  const updateFilteredItems = () => {
    const filteredList = placeList.filter((item) =>
      item.title.includes(searchKeyword)
    );
    setFilteredItems(filteredList);
  };

  return (
    <>
      <PageCover title="플래너 게시판" />
      <div className="container">
        <form className={reviewPost.form} onSubmit={handleSearch}>
          <div className={reviewPost.formContainer}>
            <div className={reviewPost.searchContainer}>
              <Base
                placeholder="제목을 검색하세요"
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
        {filteredItems.length > 0 || placeList.length > 0 ? (
          <CardList
            inquiryCounting={true}
            placeList={
              filteredItems.length > 0
                ? filteredItems.map((item) => ({
                    title: item.title,
                    image: demoImage,
                  }))
                : placeList.map((item) => ({
                    title: item.title,
                    image: demoImage,
                  }))
            }
            onClick={() => navigate("/detailplanner")}
          />
        ) : (
          <p>
            유저 플래너가 없습니다. 상단에 플래너 작성하기 버튼을 눌러 처음으로
            플래너를 작성해보세요!
          </p>
        )}
      </div>
    </>
  );
}

export default PlannerPost;
