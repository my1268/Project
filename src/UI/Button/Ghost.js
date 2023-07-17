import React from 'react';
import button from './Button.module.css';

function Ghost({ text, style, onClick }) {
  return (
    <button
      className={`${button.base} ${button.short} ${button.ghost}`}
      style={style}
      type='button'
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Ghost;
