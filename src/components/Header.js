import React from 'react';
import header from './Header.module.css';
import { AiOutlineMenu } from 'react-icons/ai';
import Ghost from '../UI/Button/Ghost';
import Primary from '../UI/Button/Primary';
import Menu from '../UI/Dropdown/Menu';

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
          <a href='/' className={header.login}>
            <Ghost text='로그인' />
          </a>
        </div>
        <div className={`lg-only ${header.menuList}`}>
          <div className={header.categoy}>
            <Ghost text='플래너 작성' />
            <Ghost text='리뷰 게시판' />
          </div>
          <div className={header.member}>
            <a className={header.login} href='/'>
              <Ghost text='로그인' />
            </a>
            <a href='/'>
              <Primary isShortPrimary='true' text='회원가입' />
            </a>
          </div>
        </div>
      </header>
      <Menu isOpenMenu='false' />
    </div>
  );
}

export default Header;
