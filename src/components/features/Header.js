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
    setIsLoggedIn(false);
    navigate("/");
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
            <Ghost text="플래너 작성" />
            <Ghost text="리뷰 게시판" />
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
      <Menu isOpenMenu={isOpenMenu} />
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
          <SignUpModal onClick={() => setIsOpenSignUp(false)} />
          <Overlay onClick={() => setIsOpenSignUp(false)} />
        </>
      )}
    </div>
  );
}

export default Header;
