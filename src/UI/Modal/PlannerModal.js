import React from 'react';
import Ghost from '../Button/Ghost';
import modal from './Modal.module.css';
import { GrClose } from 'react-icons/gr';
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import CardList from '../Card/CardList';
import demoImage from '../../assets/images/놀이공원.png';
import TimeTable from '../TimeTable/TimeTable';

function PlannerModal({ onClick }) {
  const placeList = [
    {
      name: '놀이공원1',
      date: '3월 10일 12:00 - 13:00',
      address: '서울특별시 강남구',
      image: demoImage,
    },
    {
      name: '놀이공원2',
      date: '3월 10일 12:00 - 13:00',
      address: '서울특별시 강남구',
      image: demoImage,
    },
    {
      name: '놀이공원3',
      date: '3월 10일 12:00 - 13:00',
      address: '서울특별시 강남구',
      image: demoImage,
    },
  ];
  return (
    <aside className={`${modal.base} ${modal.posting}`}>
      <header className={modal.header}>
        <h2>플래너 제목</h2>
        <div className={modal.buttonWrapper}>
          <Ghost text='수정' style={{ color: '#3DA5F5' }} className='lg-only' />
          <Ghost text='삭제' style={{ color: '#F86D7D' }} className='lg-only' />
          <button type='button' className={`sm-only ${modal.edit}`}>
            <MdEdit />
          </button>
          <button type='button' className={`sm-only ${modal.delete}`}>
            <AiTwotoneDelete />
          </button>
        </div>
        <button
          type='button'
          className={`sm-only ${modal.close}`}
          onClick={onClick}
        >
          <GrClose />
        </button>
      </header>
      <div className={modal.section}>
        <h3>타임테이블</h3>
        <TimeTable />
      </div>
      <div className={modal.section}>
        <h3>장소 정보</h3>
        <CardList placeList={placeList} />
      </div>
    </aside>
  );
}

export default PlannerModal;
