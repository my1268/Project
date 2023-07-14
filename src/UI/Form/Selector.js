import React from 'react';
import form from './Form.module.css';
import { AiFillCaretDown } from 'react-icons/ai';

function Selector({ placeholder }) {
  return (
    <div className={form.selector}>
      <select className={`${form.base}`}>
        <option value='' selected disabled>
          {placeholder}
        </option>
        <option value='option1'>option01</option>
        <option value='option2'>option02</option>
        <option value='option3'>option03</option>
      </select>
      <i className={form.caret}>
        <AiFillCaretDown />
      </i>
    </div>
  );
}

export default Selector;
