import React from "react";
import form from "./Form.module.css";

function Memo({ placeholder, value, onChange }) {
  return (
    <textarea
      className={`${form.base} ${form.memo}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Memo;
