import React from 'react';
import form from './Form.module.css';
import Mini from '../Button/Mini';

function ButtonType({ placeholder, buttonText }) {
  return (
    <div className={form.buttonType}>
      <input className={form.base} type='text' placeholder={placeholder} />
      <Mini text='중복확인' color='gray' />
    </div>
  );
}

export default ButtonType;
