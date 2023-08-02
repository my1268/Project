import React, { useState } from "react";
import modal from "./Modal.module.css";
import Primary from "../Button/Primary";
import { GrClose } from "react-icons/gr";
import PasswordType from "../Form/PasswordType";
import NewPasswordModal from "./NewPasswordModal";

function PasswordModal({ onClick }) {
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <aside className={`${modal.base} ${modal.member}`}>
      <h2>비밀번호 찾기</h2>
      <PasswordType style={{ marginBottom: "16px" }} />
      <Primary
        onClick={() => setShowNewPassword(true)}
        text="확인" // 하나라도 아니면 경고창 발생
        //아이디, 이름, 비번찾기 질문이 다 맞을때 비밀번호 수정 모달창으로 이동
        style={{ marginBottom: "64px" }}
      />
      <div className={modal.extraButtons}></div>
      <button
        type="button"
        className={`sm-only ${modal.close}`}
        onClick={onClick}
      >
        <GrClose />
      </button>
      {showNewPassword && (
        <NewPasswordModal onClick={() => setShowNewPassword(false)} />
      )}
    </aside>
  );
}

export default PasswordModal;
