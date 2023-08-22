import React, { useState } from "react";
import modal from "./Modal.module.css";
import { GrClose } from "react-icons/gr";
import PasswordType from "../Form/PasswordType";
import NewPasswordModal from "./NewPasswordModal";

function PasswordModal({ onClick }) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handlePasswordUpdated = () => {
    setPasswordUpdated(true);
  };

  return !passwordUpdated ? (
    <aside className={`${modal.base} ${modal.member}`}>
      <h2>비밀번호 찾기</h2>
      <PasswordType
        style={{ marginBottom: "16px" }}
        setShowNewPassword={setShowNewPassword}
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
        <NewPasswordModal
          onClick={() => setShowNewPassword(false)}
          onCloseModal={handlePasswordUpdated}
        />
      )}
    </aside>
  ) : null;
}

export default PasswordModal;
