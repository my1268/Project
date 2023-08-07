import React, { useState } from "react";
import Categories from "../features/Categories";
import PageCover from "../features/PageCover";
import myMenu from "./MyMenu.module.css";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";

function MyMenu() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateConfirmPassword = () => {
    const changePasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!password.match(changePasswordRegex)) {
      setConfirmPasswordError(
        "비밀번호는 영문과 숫자를 조합하여 8-20자 입니다."
      );
      return false;
    }
    return true;
  };
  const handleChangePasswordChange = (event) => {
    setPassword(event.target.value);
    setConfirmPasswordError("");
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("");
  };
  const match = password === confirmPassword;

  const handleSubmit = () => {
    if (!validateConfirmPassword() || !match) {
      return;
    } else {
      alert("회원 탈퇴 완료"); //회원 탈퇴 post
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
                <dt>닉네임</dt>
                <dd>
                  <Base placeholder="닉네임" />
                </dd>
              </div>
            </dl>
            <Primary text="닉네임 수정" />
          </form>
          <form
            style={{ position: "relative", top: "90px" }}
            className={myMenu.form}
          >
            <dl className={myMenu.list}>
              <div className={myMenu.item}>
                <dt>회원 탈퇴</dt>
                <dd>
                  <Base
                    type="password"
                    placeholder="현재 비밀번호"
                    onChange={handleChangePasswordChange}
                    value={password}
                  />
                  <Base
                    type="password"
                    placeholder="현재 비밀번호 확인"
                    onChange={handleConfirmPasswordChange}
                    value={confirmPassword}
                  />
                </dd>
              </div>
            </dl>
            <Primary text="회원 탈퇴" onClick={handleSubmit} />
            {password !== confirmPassword && (
              <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
            )}
            <p style={{ color: "red" }}>{confirmPasswordError}</p>
          </form>
        </div>
      </div>
    </>
  );
}

export default MyMenu;
