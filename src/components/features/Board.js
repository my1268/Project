import React from "react";
import board from "./Board.module.css";
import Mini from "../../UI/Button/Mini";

function Board({ list, onClick, title }) {
  return (
    <ul className={board.table}>
      <li className={board.tableHeader}>
        <h3>{title}</h3>
        <h3 className="lg-only">날짜</h3>
        <div className="lg-only"></div>
      </li>
      {list.map((item) => {
        return (
          <li className={board.tableBody} key={item.title}>
            <button type="button" className={board.title} onClick={onClick}>
              {item.title}
            </button>
            <span className={`lg-only ${board.date}`}>{item.date}</span>
            <Mini color="red" text="삭제" />
          </li>
        );
      })}
    </ul>
  );
}

export default Board;
