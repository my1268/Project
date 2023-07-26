import React, { useState } from 'react';
import header from './Header.module.css';
import { AiOutlineMenu } from 'react-icons/ai';
import Ghost from '../../UI/Button/Ghost';
import Primary from '../../UI/Button/Primary';
import Menu from '../../UI/Dropdown/Menu';
import { BsFillPersonFill } from 'react-icons/bs';
import LoginModal from '../../UI/Modal/LoginModal';
import Overlay from '../../UI/Modal/Overlay';

function Header() {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  return (
    <div className={header.wrapper}>
      <header className={header.header}>
        <h1 className={header.logo}>
          <a href='/'>Trip Planner</a>
        </h1>
        <div className={`sm-only ${header.buttonList}`}>
          <button className={header.menu} type='button'>
            <AiOutlineMenu />
          </button>
          {/* 비회원인 경우 */}
          <Ghost
            text='로그인'
            style={{ color: '#3da5f5' }}
            onClick={() => setIsOpenLogin(true)}
          />
          {/* 회원인 경우 */}
          {/* <a href='/' className={header.myMenu}>
            <BsFillPersonFill />
          </a> */}
        </div>
        <div className={`lg-only ${header.menuList}`}>
          <div className={header.categoy}>
            <Ghost text='플래너 작성' />
            <Ghost text='리뷰 게시판' />
          </div>
          {/* 비회원인 경우 */}
          <div className={header.member}>
            <Ghost
              text='로그인'
              style={{ color: '#3da5f5' }}
              onClick={() => setIsOpenLogin(true)}
            />
            <a href='/'>
              <Primary isShortPrimary='true' text='회원가입' />
            </a>
          </div>
          {/* 회원인 경우 */}
          {/* <a href='/' className={header.myMenu}>
            <BsFillPersonFill />
          </a> */}
        </div>
      </header>
      <Menu isOpenMenu='false' />
      {isOpenLogin && (
        <>
          <LoginModal onClick={() => setIsOpenLogin(false)} />
          <Overlay onClick={() => setIsOpenLogin(false)} />
        </>
      )}
    </div>
  );
}

export default Header;
