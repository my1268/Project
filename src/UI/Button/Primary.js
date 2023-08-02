import React from "react";
import button from "./Button.module.css";

function Primary({ text, isShortPrimary, style, onClick }) {
  return (
    <button
      className={`${button.base} ${button.primary} ${
        isShortPrimary && button.short
      }`}
      style={style}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Primary;
