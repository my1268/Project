import React from 'react';
import button from './Button.module.css';

function Mini({ text, color }) {
  return (
    <button
      className={`${button.mini} ${color === 'red' ? button.red : button.gray}`}
      type='button'
    >
      {text}
    </button>
  );
}

export default Mini;
