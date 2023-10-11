import React from "react";
import table from "./TimeTable.module.css";

function TimeTable({ savePlaceData }) {
  const renderTimeTable = () => {
    console.log(savePlaceData);
    if (!savePlaceData || !savePlaceData.length) {
      return <p>장소 데이터가 없습니다.</p>;
    }
    return savePlaceData.map((item, index) => (
      <li key={index}>
        <h4 className={table.header}>{item.date}</h4>
        <ul className={table.contents}>
          <li>{item.place}</li>
        </ul>
      </li>
    ));
  };
  return (
    <div className={table.table}>
      <div className={table.time}>
        <h4 className={table.header}>시간/날짜</h4>
        <ul className={table.contents}>
          <li>06:00-09:00</li>
          <li>09:00-12:00</li>
          <li>12:00-15:00</li>
          <li>15:00-18:00</li>
          <li>18:00-21:00</li>
          <li>21:00-24:00</li>
        </ul>
      </div>
      {renderTimeTable()}
    </div>
  );
}

export default TimeTable;
