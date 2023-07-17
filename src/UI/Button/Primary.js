import React from 'react';
import button from './Button.module.css';

function Primary({ text, isShortPrimary, style }) {
  return (
    <button
      className={`${button.base} ${button.primary} ${
        isShortPrimary && button.short
      }`}
      style={style}
      type='button'
    >
      {text}
    </button>
  );
}

export default Primary;
