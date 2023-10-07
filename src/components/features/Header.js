import React, { useState } from "react";
import header from "./Header.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import Ghost from "../../UI/Button/Ghost";
import Primary from "../../UI/Button/Primary";
import Menu from "../../UI/Dropdown/Menu";
import { BsFillPersonFill } from "react-icons/bs";
import LoginModal from "../../UI/Modal/LoginModal";
import Overlay from "../../UI/Modal/Overlay";
import SignUpModal from "../../UI/Modal/SignUpModal";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../Tokens/getToken";
import { removeToken } from "../Tokens/removeToken";

function Header() {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsOpenLogin(false);
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handlePlannerButtonClick = () => {
    const token = getToken();
    if (token) {
      navigate("/makingplanner");
    } else {
      alert("로그인 후 이용해주세요");
      setIsOpenLogin(true);
    }
  };

  const handlePlannerPostButtonClick = () => {
    navigate("/plannerpost");
  };

  const handleReviewPostButtonClick = () => {
    navigate("/reviewpost");
  };

  const handleInquiryPostButtonClick = () => {
    navigate("/inquirypost");
  };
  return (
    <div className={header.wrapper}>
      <header className={header.header}>
        <h1 className={header.logo}>
          <Link to="/">Trip Planner</Link>
        </h1>
        <div className={`sm-only ${header.buttonList}`}>
          <button
            className={header.menu}
            type="button"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            <AiOutlineMenu />
          </button>
        </div>
        <div className={`lg-only ${header.menuList}`}>
          <div className={header.categoy}>
            <Ghost text="플래너 작성" onClick={handlePlannerButtonClick} />
            <Ghost text="플래너 완성" onClick={handlePlannerPostButtonClick} />
            <Ghost text="리뷰 게시판" onClick={handleReviewPostButtonClick} />
            <Ghost text="궁금한 점" onClick={handleInquiryPostButtonClick} />
          </div>
          <div className={header.member}>
            {isLoggedIn ? (
              <>
                <Link to="/mymenu" className={header.myMenu}>
                  <BsFillPersonFill />
                </Link>
                <button
                  className={header.logout}
                  type="button"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Ghost
                  text="로그인"
                  style={{ color: "#3da5f5" }}
                  onClick={() => setIsOpenLogin(true)}
                />
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpenSignUp(true);
                  }}
                >
                  <Primary
                    isShortPrimary="true"
                    text="회원가입"
                    onClick={() => setIsOpenSignUp(true)}
                  />
                </a>
              </>
            )}
          </div>
        </div>
      </header>
      <Menu isOpenMenu={isOpenMenu} onClick={handlePlannerButtonClick} />
      {isOpenLogin && (
        <>
          <LoginModal
            onClick={() => setIsOpenLogin(false)}
            onLoginSuccess={handleLoginSuccess}
          />
          <Overlay onClick={() => setIsOpenLogin(false)} />
        </>
      )}
      {isOpenSignUp && (
        <>
          <SignUpModal
            onClick={() => setIsOpenSignUp(false)}
            onCloseModal={() => setIsOpenSignUp(false)}
          />
          <Overlay onClick={() => setIsOpenSignUp(false)} />
        </>
      )}
    </div>
  );
}
export default Header;
