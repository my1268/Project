import React from 'react';
import page from './Pagination.module.css';

function PageButton({ number }) {
  return (
    <button className={page.button} type='button'>
      {number}
    </button>
  );
}

export default PageButton;
