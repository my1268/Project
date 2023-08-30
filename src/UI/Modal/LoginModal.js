import React, { useState } from "react";
import modal from "./Modal.module.css";
import LoginType from "../Form/LoginType";
import Primary from "../Button/Primary";
import Kakao from "../Button/Kakao";
import { GrClose } from "react-icons/gr";
import SignUpModal from "./SignUpModal";
import PasswordModal from "./PasswordModal";
import { useNavigate } from "react-router-dom";
//import axios from "axios";

function LoginModal({ onClick, onLoginSuccess }) {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    //  try {
    //   const response = await axios.post("/login/normal", {
    //    email: email,
    //    password: password,
    //      });
    //     if (response.data.token) {
    //   localStorage.setItem("token", response.data.token);
    onLoginSuccess();
    //    } else {
    //    alert("이메일 또는 비밀번호를 다시 확인해주세요.");
    //    setEmail("");
    //    setPassword("");
    //       }
    //    } catch (error) {
    //      console.error("로그인 실패:", error);
    //   }
  };

  const navigate = useNavigate("");
  const handleCloseModal = () => {
    onClick();
    navigate("/");
  };

  return (
    <aside className={`${modal.base} ${modal.member}`}>
      <h2>로그인</h2>
      <LoginType
        style={{ marginBottom: "16px" }}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <Primary
        text="로그인"
        style={{ marginBottom: "64px" }}
        onClick={handleLogin}
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
