import React from 'react';
import button from './Button.module.css';

function Primary({ text, isShortPrimary }) {
  return (
    <button
      className={`${button.base} ${button.primary} ${
        isShortPrimary && button.short
      }`}
      type='button'
    >
      {text}
    </button>
  );
}

export default Primary;
