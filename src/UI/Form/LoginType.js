import React from 'react';
import form from './Form.module.css';

function LoginType() {
  return (
    <div className={form.loginType}>
      <input className={form.base} type='text' placeholder='아이디' />
      <input className={form.base} type='password' placeholder='비밀번호' />
    </div>
  );
}

export default LoginType;
