import React from "react";
import button from "./Button.module.css";

function Mini({ text, color, onClick }) {
  return (
    <button
      className={`${button.base} ${button.mini} ${
        color === "red" ? button.red : button.gray
      }`}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Mini;
