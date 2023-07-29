import React from 'react';
import Base from '../../UI/Form/Base';
import Primary from '../../UI/Button/Primary';
import Date from '../../UI/Form/Date';
import Memo from '../../UI/Form/Memo';
import PageCover from '../features/PageCover';
import making from './MakingPlanner.module.css';
import Outlined from '../../UI/Button/Outlined';

// 플래너 만들기
// -> 리뷰 작성 페이지 만들어 주세요.
function MakingPlanner() {
  return (
    <>
      <PageCover title='플래너 만들기' />
      <div className='not-layout'>
        <div className='container'>
          <form className={making.form}>
            <dl className={making.list}>
              <div className={making.item}>
                <dt>제목</dt>
                <dd>
                  <Base placeholder='제목' />
                </dd>
              </div>
              <div className={making.item}>
                <dt>시작 날짜</dt>
                <dd>
                  <Date />
                </dd>
              </div>
              <div className={making.item}>
                <dt>마지막 날짜</dt>
                <dd>
                  <Date />
                </dd>
              </div>
              <div className={making.item}>
                <dt>메모</dt>
                <dd>
                  <Memo placeholder='메모를 입력하세요' />
                </dd>
              </div>
            </dl>
            <Primary text='장소 검색' style={{ marginBottom: '8px' }} />
            <Outlined text='키워드 검색' />
          </form>
        </div>
      </div>
    </>
  );
}

export default MakingPlanner;
