import React, { useEffect, useState } from "react";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import Memo from "../../UI/Form/Memo";
import Categories from "../features/Categories";
import PageCover from "../features/PageCover";
import making from "./MakingPlanner.module.css";
import { getToken } from "../Tokens/getToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyInquiryWrite() {
  const [nickName, setNickName] = useState("");
  const [title, setTitle] = useState("");
  const [inquiryText, setInquiryText] = useState("");

  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    const getNickName = async () => {
      try {
        if (token) {
          const getName = await axios.get("/member/info");
          const userNickName = getName.data;
          setNickName(userNickName.nickName);
        }
      } catch (error) {
        console.error("닉네임을 가져오는 중 오류 발생:", error);
      }
    };
    getNickName();
  }, [token]);

  const handleInquirySubmit = async () => {
    try {
      if (!title) {
        alert("제목은 필수 입력 항목입니다.");
        return;
      }
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const response = await axios.post("/inquiry/url", {
        //예시 URL
        nickName,
        title,
        inquiryText,
        date: `${year}-${month}-${day}`,
      });
      if (response.status === 200) {
        console.log("서버 응답 데이터:", response.data);
        alert("문의가 성공적으로 업로드되었습니다.");
        navigate("/myinquiry");
      } else {
        console.error("서버 응답 상태 코드가 200이 아닙니다.");
      }
    } catch (error) {
      console.error("문의 업로드 중 오류 발생:", error);
    }
  };

  return (
    <>
      <PageCover title="문의 작성" />
      <div className="layout">
        <Categories />
        <div className="container">
          <form className={making.form}>
            <dl className={making.list}>
              <div className={making.item}>
                <dt>닉네임</dt>
                <dd>
                  <Base
                    value={nickName}
                    placeholder="내 닉네임"
                    readOnly
                    onChange={(e) => setNickName(e.target.value)}
                  />
                </dd>
              </div>
              <div className={making.item}>
                <dt>제목</dt>
                <dd>
                  <Base
                    value={title}
                    placeholder="제목"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </dd>
              </div>
              <div className={making.item}>
                <dt>문의 작성</dt>
                <dd>
                  <Memo
                    placeholder="문의"
                    value={inquiryText}
                    onChange={(e) => setInquiryText(e.target.value)}
                  />
                </dd>
              </div>
            </dl>
            <Primary text="작성 완료" onClick={handleInquirySubmit} />
          </form>
        </div>
      </div>
    </>
  );
}

export default MyInquiryWrite;
