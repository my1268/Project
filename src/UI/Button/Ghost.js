import React from 'react';
import button from './Button.module.css';

function Ghost({ text, isOpenCategory }) {
  return (
    <button
      className={`${button.ghost} ${isOpenCategory && button.isOpen}`}
      type='button'
    >
      {text}
    </button>
  );
}

export default Ghost;
