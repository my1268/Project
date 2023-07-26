import React from 'react';
import Categories from '../features/Categories';
import PageCover from '../features/PageCover';
import Base from '../../UI/Form/Base';
import Primary from '../../UI/Button/Primary';
import Pagination from '../../UI/Pagination/Pagination';
import myPlanner from './MyPlanner.module.css';
import Board from '../features/Board';

function MyPlanner() {
  const list = [
    { title: '플래너 제목 1', date: '23.03.01 - 23.03.04', page: '/' },
    { title: '플래너 제목 2', date: '23.02.01 - 23.02.04', page: '/' },
  ];

  return (
    <>
      <PageCover title='마이페이지' />
      <div className='layout'>
        <Categories />

        <div className='container'>
          <form className={myPlanner.form}>
            <Base placeholder='플래너를 검색하세요' />
            <Primary isShortPrimary='true' text='검색' />
          </form>

          <Board list={list} />
          <Pagination />
        </div>
      </div>
    </>
  );
}

export default MyPlanner;
