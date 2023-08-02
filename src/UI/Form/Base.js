import React from "react";
import form from "./Form.module.css";

function Base({ type = "text", placeholder, onChange }) {
  return (
    <input
      className={form.base}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default Base;
