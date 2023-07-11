import React from 'react';
import page from './Pagination.module.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PageButton from './PageButton';

function Pagination() {
  return (
    <div className={page.buttons}>
      <button className={page.chevron} type='button'>
        <FiChevronLeft />
      </button>
      <div className={page.pages}>
        <PageButton number='1' />
        <PageButton number='2' />
        <PageButton number='3' />
        <PageButton number='4' />
      </div>
      <button className={page.chevron} type='button'>
        <FiChevronRight />
      </button>
    </div>
  );
}

export default Pagination;
