import React, { useState } from "react";
import modal from "./Modal.module.css";
import Primary from "../Button/Primary";
import { GrClose } from "react-icons/gr";
import NewPasswordType from "../Form/NewPasswordType";

function NewPasswordModal({ onClick }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setNewPasswordError] = useState("");

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!newPassword.match(passwordRegex)) {
      setNewPasswordError("비밀번호는 영문과 숫자를 조합하여 8-20자 입니다.");
      return false;
    }
    return true;
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
    setNewPasswordError("");
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setNewPasswordError("");
  };

  const match = newPassword === confirmPassword;

  const handleSubmit = () => {
    if (!validatePassword() || !match) {
      return;
    } else {
      alert("비밀번호 수정완료"); //비밀번호 수정 post
    }
  };

  return (
    <aside className={`${modal.base} ${modal.member}`}>
      <h2>비밀번호 수정</h2>
      <NewPasswordType
        style={{ marginBottom: "80px" }}
        handlePasswordChange={handlePasswordChange}
        handleConfirmPasswordChange={handleConfirmPasswordChange}
      />
      <Primary
        text="저장"
        style={{ marginBottom: "64px" }}
        onClick={handleSubmit} // 수정 비번  post
      />
      <p style={{ color: "red" }}>{passwordError}</p>
      {newPassword !== confirmPassword && (
        <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
      )}

      <button
        type="button"
        className={`sm-only ${modal.close}`}
        onClick={onClick}
      >
        <GrClose />
      </button>
    </aside>
  );
}

export default NewPasswordModal;
