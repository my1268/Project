import React from "react";
import form from "./Form.module.css";

function Base({
  type = "text",
  placeholder,
  onChange,
  maxLength,
  value,
  readOnly,
}) {
  return (
    <input
      className={form.base}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
      readOnly={readOnly}
    />
  );
}

export default Base;
