import React from "react";
import form from "./Form.module.css";

function Date({ value, onChange }) {
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    onChange(selectedDate);
  };

  return (
    <input
      className={form.base}
      type="date"
      value={value}
      onChange={handleDateChange}
    />
  );
}

export default Date;
