import React, { useState, useEffect } from "react";
import demoImage1 from "../../assets/images/풍경1.png";
import demoImage2 from "../../assets/images/풍경2.png";
import demoImage3 from "../../assets/images/풍경3.png";
import demoImage4 from "../../assets/images/풍경4.png";
import Primary from "../../UI/Button/Primary";
import main from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import { getToken } from "../Tokens/getToken";

const images = [demoImage1, demoImage2, demoImage3, demoImage4];

function Main() {
  const [currentImage, setCurrentImage] = useState(0);

  const navigate = useNavigate();
  const writeButtonClick = () => {
    const token = getToken();
    if (token) {
      navigate("/makingplanner");
    } else {
      alert("로그인 후 이용해주세요");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className={main.main}>
      <div className={main.wrapper}>
        <div className={main.image}>
          <img src={images[currentImage]} alt="풍경" />
        </div>
        <p className={main.message}>
          <strong>도시의 환상</strong>과
          <br />
          <strong>자연의 신비</strong>가 어우러진
          <br />
          여행을 즐겨보세요!
        </p>
      </div>
      <Primary text="플래너 작성하기 가기" onClick={writeButtonClick} />
      <div className={main.background}></div>
    </main>
  );
}

export default Main;
