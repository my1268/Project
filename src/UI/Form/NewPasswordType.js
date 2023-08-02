import React from "react";
import form from "./Form.module.css";

function NewPasswordType({
  style,
  handlePasswordChange,
  handleConfirmPasswordChange,
}) {
  return (
    <div style={style} className={form.loginType}>
      <input
        className={`${form.base} ${form.inputMargin}`}
        type="password"
        placeholder="새 비밀번호"
        onChange={handlePasswordChange}
      />
      <input
        className={`${form.base} ${form.inputMargin}`}
        type="password"
        placeholder="새 비밀번호 확인"
        onChange={handleConfirmPasswordChange}
      />
    </div>
  );
}

export default NewPasswordType;
