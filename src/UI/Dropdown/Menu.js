import React from 'react';
import dropdown from './Dropdown.module.css';

function Menu({ isOpenMenu }) {
  return (
    <aside
      className={`sm-only ${dropdown.menu} ${
        isOpenMenu === 'true' && dropdown.menuOpen
      }`}
    >
      <a href='/'>플래너 작성</a>
      <a href='/'>리뷰 게시판</a>
    </aside>
  );
}

export default Menu;
