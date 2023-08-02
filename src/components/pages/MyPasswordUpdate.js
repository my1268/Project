import React, { useState } from "react";
import Categories from "../features/Categories";
import PageCover from "../features/PageCover";
import myMenu from "./MyMenu.module.css";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";

function MyPasswordUpdate() {
  const [password, setPassword] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!password.match(passwordRegex)) {
      setPasswordError("현재 비밀번호를 입력하고 다시 확인해주세요.");
      return false;
    }
    return true;
  };

  const validateConfirmPassword = () => {
    const changePasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!changePassword.match(changePasswordRegex)) {
      setConfirmPasswordError(
        "새 비밀번호는 영문과 숫자를 조합하여 8-20자 입니다."
      );
      return false;
    }
    return true;
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleChangePasswordChange = (event) => {
    setChangePassword(event.target.value);
    setConfirmPasswordError("");
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("");
  };
  const match = changePassword === confirmPassword;

  const handleSubmit = () => {
    if (!validatePassword() || !validateConfirmPassword() || !match) {
      return;
    } else {
      alert("비밀번호 수정완료"); //비밀번호 수정 post
    }
  };
  return (
    <>
      <PageCover title="마이페이지" />
      <div className="layout">
        <Categories />
        <div className="container">
          <form className={myMenu.form}>
            <dl className={myMenu.list}>
              <div className={myMenu.item}>
                <dt>현재 비밀번호</dt>
                <dd>
                  <Base
                    type="password"
                    placeholder="현재 비밀번호"
                    onChange={handlePasswordChange}
                    value={password}
                  />
                </dd>
              </div>
              <div className={myMenu.item}>
                <dt>변경 비밀번호</dt>
                <dd>
                  <Base
                    type="password"
                    placeholder="변경 비밀번호"
                    onChange={handleChangePasswordChange}
                    value={changePassword}
                  />
                </dd>
              </div>
              <div className={myMenu.item}>
                <dt>비밀번호 확인</dt>
                <dd>
                  <Base
                    type="password"
                    placeholder="비밀번호 확인"
                    onChange={handleConfirmPasswordChange}
                    value={confirmPassword}
                  />
                </dd>
              </div>
            </dl>
            <Primary text="비밀번호 수정" onClick={handleSubmit} />
            {<p style={{ color: "red" }}>{passwordError}</p>}
            {changePassword !== confirmPassword && (
              <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
            )}
            <p style={{ color: "red" }}>{confirmPasswordError}</p>
          </form>
        </div>
      </div>
    </>
  );
}

export default MyPasswordUpdate;