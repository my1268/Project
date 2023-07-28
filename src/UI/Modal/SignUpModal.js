import React from "react";
import modal from "./Modal.module.css";
import SignUpType from "../Form/SignUpType";
import Primary from "../Button/Primary";
import { GrClose } from "react-icons/gr";

function SignUpModal({ onClick }) {
  return (
    <aside className={`${modal.base} ${modal.member}`}>
      <h2>회원가입</h2>
      <SignUpType style={{ marginBottom: "16px" }} />
      <Primary text="회원가입" style={{ marginBottom: "64px" }} />
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

export default SignUpModal;
