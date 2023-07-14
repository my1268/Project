import React from 'react';
import button from './Button.module.css';

function Ghost({ text }) {
  return (
    <button
      className={`${button.base} ${button.short} ${button.ghost}`}
      type='button'
    >
      {text}
    </button>
  );
}

export default Ghost;
