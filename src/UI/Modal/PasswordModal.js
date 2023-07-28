import React from "react";
import modal from "./Modal.module.css";
import Primary from "../Button/Primary";
import { GrClose } from "react-icons/gr";
import PasswordType from "../Form/PasswordType";

function PasswordModal({ onClick }) {
  return (
    <aside className={`${modal.base} ${modal.member}`}>
      <h2>비밀번호 찾기</h2>
      <PasswordType style={{ marginBottom: "16px" }} />
      <Primary text="확인" style={{ marginBottom: "64px" }} />
      <div className={modal.extraButtons}></div>
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

export default PasswordModal;
