import React from 'react';
import table from './TimeTable.module.css';

// 백엔드에서 넘겨받은 JSON 양식에 맞도록 props 설정
function TimeTable() {
  return (
    <div className={table.table}>
      <div className={table.time}>
        <h4 className={table.header}>시간/날짜</h4>
        <ul className={table.contents}>
          <li>10:00-11:00</li>
          <li>10:00-11:00</li>
          <li>10:00-11:00</li>
          <li>10:00-11:00</li>
        </ul>
      </div>
      <ul className={table.date}>
        <li>
          <h4 className={table.header}>03.01</h4>
          <ul className={table.contents}>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
          </ul>
        </li>
        <li>
          <h4 className={table.header}>03.01</h4>
          <ul className={table.contents}>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
          </ul>
        </li>
        <li>
          <h4 className={table.header}>03.01</h4>
          <ul className={table.contents}>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
          </ul>
        </li>
        <li>
          <h4 className={table.header}>03.01</h4>
          <ul className={table.contents}>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
          </ul>
        </li>
        <li>
          <h4 className={table.header}>03.01</h4>
          <ul className={table.contents}>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
          </ul>
        </li>
        <li>
          <h4 className={table.header}>03.01</h4>
          <ul className={table.contents}>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
          </ul>
        </li>
        <li>
          <h4 className={table.header}>03.01</h4>
          <ul className={table.contents}>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
          </ul>
        </li>
        <li>
          <h4 className={table.header}>03.01</h4>
          <ul className={table.contents}>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
          </ul>
        </li>
        <li>
          <h4 className={table.header}>03.01</h4>
          <ul className={table.contents}>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
          </ul>
        </li>
        <li>
          <h4 className={table.header}>03.01</h4>
          <ul className={table.contents}>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
            <li>스케줄</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default TimeTable;
