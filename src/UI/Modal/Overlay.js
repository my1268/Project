import React from 'react';
import overlay from './Overlay.module.css';

function Overlay({ onClick }) {
  return <div className={overlay.overlay} onClick={onClick}></div>;
}

export default Overlay;
