import React from "react";
import table from "./TimeTable.module.css";

function TimeTable({ placeSearchData }) {
  const renderTimeTable = () => {
    if (!placeSearchData || !placeSearchData.length) {
      return <p>장소 데이터가 없습니다.</p>;
    }
    return placeSearchData.map((item, index) => (
      <li key={index}>
        <h4 className={table.header}>{item.date}</h4>
        <ul className={table.contents}>
          <li>{`${item.startTime}-${item.endTime}`}</li>
          {item.waypoints &&
            item.waypoints.map((waypoint, waypointIndex) => (
              <li key={waypointIndex}>{waypoint.schedule}</li>
            ))}
        </ul>
      </li>
    ));
  };
  return (
    <div className={table.table}>
      <div className={table.time}>
        <h4 className={table.header}>시간/날짜</h4>
        <ul className={table.contents}></ul>
      </div>
      <ul className={table.date}>{renderTimeTable()}</ul>
    </div>
  );
}

export default TimeTable;
