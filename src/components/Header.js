import React from 'react';
import header from './Header.module.css';
import { AiOutlineMenu } from 'react-icons/ai';
import Ghost from '../UI/Button/Ghost';
import Primary from '../UI/Button/Primary';

function Header() {
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
          <Ghost text='로그인' />
        </div>
        <div className={`lg-only ${header.menuList}`}>
          <div className={header.categoy}>
            <Ghost text='플래너 작성' />
            <Ghost text='리뷰 게시판' />
          </div>
          <div className={header.member}>
            <Ghost text='로그인' />
            <Primary isShortPrimary='true' text='회원가입' />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
