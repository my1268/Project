import React from "react";
import form from "./Form.module.css";

function Base({ type = "text", placeholder, onChange, maxLength }) {
  return (
    <input
      className={form.base}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
}

export default Base;
