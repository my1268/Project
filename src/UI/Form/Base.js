import React from 'react';
import form from './Form.module.css';

function Base({ placeholder }) {
  return <input className={form.base} type='text' placeholder={placeholder} />;
}

export default Base;
