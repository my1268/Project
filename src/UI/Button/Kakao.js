import React from 'react';
import button from './Button.module.css';

function Kakao({ style }) {
  return (
    <button style={style} className={button.kakao} type='button'>
      카카오 로그인
    </button>
  );
}

export default Kakao;
