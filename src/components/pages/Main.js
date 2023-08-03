import React from "react";
import demoImage from "../../assets/images/화담숲.png";
import Primary from "../../UI/Button/Primary";
import main from "./Main.module.css";

function Main() {
  return (
    <main className={main.main}>
      <div className={main.wrapper}>
        <div className={main.image}>
          <img src={demoImage} alt="화담숲" />
        </div>
        <p className={main.message}>
          <strong>도시의 환상</strong>과
          <br />
          <strong>자연의 신비</strong>가 어우러진
          <br />
          여행을 즐겨보세요!
        </p>
      </div>
      <a href="/">
        <Primary text="플래너 작성하기 가기" />
      </a>
      <div className={main.background}></div>
    </main>
  );
}

export default Main;
