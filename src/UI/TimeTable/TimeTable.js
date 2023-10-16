import React from "react";
import table from "./TimeTable.module.css";

function TimeTable({ savePlaceData }) {
  const formatDate = (dateArray) => {
    return dateArray.join("-");
  };

  const formatTime = (timeArray) => {
    return timeArray
      .slice(3)
      .map((item) => item.toString().padStart(2, "0"))
      .join(":");
  };

  return (
    <div className={table.table}>
      {savePlaceData && savePlaceData.length ? (
        <div className={table.row}>
          <div className={table.cell}>
            <h4 className={table.header}>날짜</h4>
          </div>
          <div className={table.cell}>
            <h4 className={table.header}>장소</h4>
          </div>
          <div className={table.cell}>
            <h4 className={table.header}>출발 시간</h4>
          </div>
          <div className={table.cell}>
            <h4 className={table.header}>도착 시간</h4>
          </div>
        </div>
      ) : (
        <p>장소 데이터가 없습니다.</p>
      )}
      {savePlaceData &&
        savePlaceData.length &&
        savePlaceData.map((item, index) => (
          <div className={table.row} key={index}>
            <div className={table.cell}>
              <ul className={table.contents}>
                <li>{formatDate(item.date)}</li>
              </ul>
            </div>
            <div className={table.cell}>
              <ul className={table.contents}>
                <li>{item.place}</li>
              </ul>
            </div>
            <div className={table.cell}>
              <ul className={table.contents}>
                <li>{formatTime(item.startTime)}</li>
              </ul>
            </div>
            <div className={table.cell}>
              <ul className={table.contents}>
                <li>{formatTime(item.arriveTime)}</li>
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TimeTable;
