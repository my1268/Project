import React, { useState } from "react";
import modal from "./Modal.module.css";
import LoginType from "../Form/LoginType";
import Primary from "../Button/Primary";
import Kakao from "../Button/Kakao";
import { GrClose } from "react-icons/gr";
import SignUpModal from "./SignUpModal";
import PasswordModal from "./PasswordModal";
import { useNavigate } from "react-router-dom";

function LoginModal({ onClick, onLoginSuccess }) {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleLogin = () => {
    onLoginSuccess();
  };

  const navigate = useNavigate("");
  const handleCloseModal = () => {
    onClick();
    navigate("/");
  };

  return (
    <aside className={`${modal.base} ${modal.member}`}>
      <h2>로그인</h2>
      <LoginType style={{ marginBottom: "16px" }} />
      <Primary
        text="로그인"
        style={{ marginBottom: "64px" }}
        onClick={handleLogin} // 서버로 post해야함
      />
      <Kakao style={{ marginBottom: "16px" }} />
      <div className={modal.extraButtons}>
        <button onClick={() => setShowSignUpModal(true)} type="button">
          회원가입
        </button>
        <button onClick={() => setShowPasswordModal(true)} type="button">
          비밀번호 찾기
        </button>
      </div>
      <button
        type="button"
        className={`sm-only ${modal.close}`}
        onClick={handleCloseModal}
      >
        <GrClose />
      </button>

      {showSignUpModal && (
        <SignUpModal onClick={() => setShowSignUpModal(false)} />
      )}
      {showPasswordModal && (
        <PasswordModal onClick={() => setShowPasswordModal(false)} />
      )}
    </aside>
  );
}

export default LoginModal;
