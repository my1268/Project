import React from "react";
import dropdown from "./Dropdown.module.css";
import { Link } from "react-router-dom";

function Menu({ isOpenMenu, onClick }) {
  const handleMenuClick = () => {
    onClick && onClick();
  };
  return (
    <aside
      className={`sm-only ${dropdown.menu} ${isOpenMenu && dropdown.menuOpen}`}
    >
      <Link to="/makingplanner" onClick={handleMenuClick}>
        플래너 작성
      </Link>
      <Link to="/reviewpost">리뷰 게시판</Link>
    </aside>
  );
}

export default Menu;
