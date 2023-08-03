import React from "react";
import { Link, useLocation } from "react-router-dom";
import categories from "./Categories.module.css";

function Categories() {
  const location = useLocation();

  return (
    <ul className={categories.categories}>
      <li>
        <Link
          to="/mymenu"
          className={location.pathname === "/mymenu" ? categories.isOpen : null}
        >
          내 정보
        </Link>
      </li>
      <li>
        <Link
          to="/mypasswordupdate"
          className={
            location.pathname === "/mypasswordupdate" ? categories.isOpen : null
          }
        >
          비밀번호 수정
        </Link>
      </li>
      <li>
        <Link
          to="/myplanner"
          className={
            location.pathname === "/myplanner" ? categories.isOpen : null
          }
        >
          내 플래너
        </Link>
      </li>
      <li>
        <Link
          to="/mypost"
          className={location.pathname === "/mypost" ? categories.isOpen : null}
        >
          내 게시글
        </Link>
      </li>
      <li>
        <Link
          to="/mycomment"
          className={
            location.pathname === "/mycomment" ? categories.isOpen : null
          }
        >
          내 댓글
        </Link>
      </li>
    </ul>
  );
}

export default Categories;
