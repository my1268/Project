import React from 'react';
import cover from './PageCover.module.css';

function PageCover({ title }) {
  return (
    <header className={cover.background}>
      <h2 className={cover.title}>{title}</h2>
    </header>
  );
}

export default PageCover;
