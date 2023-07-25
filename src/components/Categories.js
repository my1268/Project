import React from 'react';
import categories from './Categories.module.css';

function Categories() {
  return (
    <ul className={categories.categories}>
      <li className={categories.isOpen}>
        <a href='/'>내 정보</a>
      </li>
      <li>
        <a href='/'>비밀번호 수정</a>
      </li>
      <li>
        <a href='/'>내 플래너</a>
      </li>
      <li>
        <a href='/'>내 게시글</a>
      </li>
      <li>
        <a href='/'>내 댓글</a>
      </li>
    </ul>
  );
}

export default Categories;
