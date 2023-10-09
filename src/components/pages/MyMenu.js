import React, { useEffect, useState } from "react";
import Categories from "../features/Categories";
import PageCover from "../features/PageCover";
import myMenu from "./MyMenu.module.css";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";
import ButtonType from "../../UI/Form/ButtonType";
import axios from "axios";
import { getToken } from "../Tokens/getToken";
import { removeToken } from "../Tokens/removeToken";
import { useNavigate } from "react-router-dom";
/* eslint-disable */
function MyMenu() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [nicknameError, setNicknameError] = useState("");
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    async function getNickName() {
      try {
        await axios
          .get("http://localhost:8080/member/info", {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setNickname(response.data.nickname);
          })
          .catch((error) => {
            console.error("Failed get nickname");
          });
      } catch (error) {
        console.error("Error get nickname:", error);
      } finally {
        setLoading(false);
      }
    }
    getNickName();
  }, []);

  const validateNickName = () => {
    const nicknameRegex = /^.{2,12}$/;
    if (!nickname.match(nicknameRegex)) {
      setNicknameError("닉네임을 수정하려면 2~12자 사이여야 합니다.");
      return false;
    }
    return true;
  };

  const handleNicknameCheck = async () => {
    if (!nickname) {
      alert("닉네임을 먼저 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/member/duplication",
        { nickname },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        alert("사용 가능한 닉네임입니다.");
        setNicknameChecked(true);
        setNicknameError("");
      }
    } catch (error) {
      console.error("Error checking nickname:", error);
    }
  };

  async function putUpdateNickname() {
    if (!validateNickName()) {
      return;
    }
    if (!nicknameChecked) {
      alert("닉네임 중복 확인을 먼저 해주세요.");
      return;
    }
    const confirmUpdate = window.confirm("정말로 변경하시겠습니까?");
    if (!confirmUpdate) {
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:8080/member/update",
        {
          nickname,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        console.log("Successed nickname update.");
        alert("닉네임이 성공적으로 변경되었습니다.");
      } else {
        console.error("Failed nickname update.", response.data.errorMessage);
      }
    } catch (error) {
      console.error("Error put nickname:", error);
    }
  }

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

  const handleSubmit = async () => {
    if (!validateConfirmPassword() || !match) {
      return;
    }
    const confirmDelete = window.confirm("정말로 탈퇴하시겠습니까?");
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/member/withdraw",
        { password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.data) {
        removeToken();
        alert("회원 탈퇴가 완료되었습니다.");
        navigate("/");
      } else {
        console.error("Failed to delete member:", response.data.errorMessage);
      }
    } catch (error) {
      console.error("Error deleting member:", error);
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
                  <ButtonType
                    placeholder="닉네임"
                    value={loading ? "로딩 중..." : nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onClick={handleNicknameCheck}
                  />
                </dd>
              </div>
            </dl>
            <Primary onClick={putUpdateNickname} text="닉네임 수정" />
            <p style={{ color: "red" }}>{nicknameError}</p>
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
