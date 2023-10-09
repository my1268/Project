import React, { useEffect, useState } from "react";
import PageCover from "../features/PageCover";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import reviewPost from "./ReviewPost.module.css";
import demoImage from "../../assets/images/놀이공원.png";
import CardList from "../../UI/Card/CardList";
import PlannerModal from "../../UI/Modal/PlannerModal";
import Overlay from "../../UI/Modal/Overlay";
import axios from "axios";
import { getToken } from "../Tokens/getToken";

function PlannerPost() {
  const [openModal, setOpenModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [title, setTitle] = useState("");
  const [currentMemoText, setCurrentMemoText] = useState("");
  const token = getToken();
  const [placeList, setPlaceList] = useState([]);

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
          const plannerData = response.data.dtoList;
          const newListItem = {
            title: plannerData.title,
            memo: plannerData.memo,
          };
          console.log(response);
          setPlaceList([...placeList, newListItem]);
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
            onClick={() => {
              setCurrentMemoText();
              setOpenModal(true);
            }}
          />
        ) : (
          <p>
            유저 플래너가 없습니다. 상단에 플래너 작성하기 버튼을 눌러 처음으로
            플래너를 작성해보세요!
          </p>
        )}
      </div>
      {openModal && (
        <>
          <PlannerModal
            title={title}
            subTitle="타임 테이블"
            currentMemoText={currentMemoText}
            showTimeTable={true}
            showMemo={true}
            showPlace={true}
            onClick={() => setOpenModal(false)}
            showMemoReadOnly={true}
          />
          <Overlay onClick={() => setOpenModal(false)} />
        </>
      )}
    </>
  );
}

export default PlannerPost;
