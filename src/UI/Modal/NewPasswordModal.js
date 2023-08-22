import React, { useState } from "react";
import modal from "./Modal.module.css";
import Primary from "../Button/Primary";
import { GrClose } from "react-icons/gr";
import NewPasswordType from "../Form/NewPasswordType";
import axios from "axios";

function NewPasswordModal({ onClick, onCloseModal }) {
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

  const handleSubmit = async () => {
    if (!validatePassword() || !match) {
      return;
    } else {
      try {
        const response = await axios.post(
          "/api/update-password", // 예시 URL
          { newPassword, confirmPassword },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success) {
          // 예시 response
          alert("비밀번호 수정이 완료되었습니다.");
          onCloseModal();
        } else {
          alert("비밀번호 수정에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("Error updating password:", error);
        alert("비밀번호 수정에 실패했습니다. 다시 시도해주세요.");
      }
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
        onClick={handleSubmit}
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
