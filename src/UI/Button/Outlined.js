import React from 'react';
import button from './Button.module.css';

function Outlined({ text, style }) {
  return (
    <button
      className={`${button.base} ${button.outlined}`}
      style={style}
      type='button'
    >
      {text}
    </button>
  );
}

export default Outlined;
