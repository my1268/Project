import React from 'react';
import form from './Form.module.css';

function Memo({ placeholder }) {
  return (
    <textarea
      className={`${form.base} ${form.memo}`}
      placeholder={placeholder}
    />
  );
}

export default Memo;
