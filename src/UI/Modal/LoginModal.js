import React from 'react';
import modal from './Modal.module.css';
import LoginType from '../Form/LoginType';
import Primary from '../Button/Primary';
import Kakao from '../Button/Kakao';
import { GrClose } from 'react-icons/gr';

function LoginModal({ onClick }) {
  return (
    <aside className={`${modal.base} ${modal.member}`}>
      <h2>로그인</h2>
      <LoginType style={{ marginBottom: '16px' }} />
      <Primary text='로그인' style={{ marginBottom: '64px' }} />
      <Kakao style={{ marginBottom: '16px' }} />
      <div className={modal.extraButtons}>
        <button type='button'>회원가입</button>
        <button type='button'>비밀번호 찾기</button>
      </div>
      <button
        type='button'
        className={`sm-only ${modal.close}`}
        onClick={onClick}
      >
        <GrClose />
      </button>
    </aside>
  );
}

export default LoginModal;
