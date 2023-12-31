import React, { useState } from "react";
import form from "./Form.module.css";
import { VscTriangleDown } from "react-icons/vsc";
import ButtonType from "./ButtonType";
import Primary from "../Button/Primary";
import axios from "axios";

function SignUpType({ style, onCloseModal }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectQuestion, setSelectQuestion] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [answer, setAnswer] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [answerError, setAnswerError] = useState("");

  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);

  const OptionsClick = () => {
    setShowOptions(!showOptions);
  };

  const questions = [1, 2, 3];

  const OptionSelect = (question) => {
    setSelectQuestion(question);
    setShowOptions(false);
    setShowAddInput(true);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordError("");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError("");
  };
  const handleNickNameChange = (event) => {
    setNickname(event.target.value);
    setNicknameError("");
  };
  const handleAddInputChange = (event) => {
    setAnswer(event.target.value);
    setAnswerError("");
  };
  const validateEmail = () => {
    const emailRegex =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    if (!email.match(emailRegex)) {
      setEmailError("올바른 이메일 주소를 입력해주세요.");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!password.match(passwordRegex)) {
      setPasswordError("비밀번호는 영문과 숫자를 조합하여 8-20자 입니다.");
      return false;
    }
    return true;
  };

  const validateName = () => {
    const NameRegex = /^.{2,12}$/;
    if (!name.match(NameRegex)) {
      setNameError("올바른 이름을 입력해주세요.");
      return false;
    }
    return true;
  };

  const validateNickName = () => {
    const nicknameRegex = /^.{2,12}$/;
    if (!nickname.match(nicknameRegex)) {
      setNicknameError("올바른 닉네임을 입력해주세요.");
      return false;
    }
    return true;
  };

  const validateAddInput = () => {
    const AddInputRegex = /^.{2,12}$/;
    if (!answer.match(AddInputRegex)) {
      setAnswerError("올바른 질문의 답을 입력해주세요.");
      return false;
    }
    return true;
  };

  const match = password === confirmPassword;

  const handleEmailCheck = async () => {
    if (!email) {
      alert("이메일을 먼저 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/member/duplication",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data) {
        alert("이미 사용 중인 이메일입니다.");
      } else {
        alert("사용 가능한 이메일입니다.");
        setEmailChecked(true);
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
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
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data) {
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        alert("사용 가능한 닉네임입니다.");
        setNicknameChecked(true);
      }
    } catch (error) {
      console.error("Error checking nickname:", error);
    }
  };

  const handleSubmit = async () => {
    if (
      !validateEmail() ||
      !validatePassword() ||
      !validateName() ||
      !validateNickName() ||
      !validateAddInput() ||
      !match
    ) {
      return;
    } else {
      if (!emailChecked) {
        alert("이메일 중복 확인을 먼저 해주세요.");
        return;
      }
      if (!nicknameChecked) {
        alert("닉네임 중복 확인을 먼저 해주세요.");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:8080/member/join",
          {
            email,
            password,
            name,
            nickname,
            questionId: selectQuestion,
            answer,
          },
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          }
        );
        if (response.data) {
          onCloseModal();
          alert("회원가입 완료");
        } else {
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div style={style} className={form.loginType}>
      <div style={{ marginBottom: "7px" }}>
        <ButtonType
          placeholder="이메일"
          onChange={handleEmailChange}
          value={email}
          onClick={handleEmailCheck}
        />
        <p style={{ color: "red" }}>{emailError}</p>
      </div>
      <input
        className={`${form.base} ${form.inputMargin}`}
        type="password"
        placeholder="비밀번호"
        onChange={handlePasswordChange}
        value={password}
      />
      <p style={{ color: "red" }}>{passwordError}</p>
      <input
        className={`${form.base} ${form.inputMargin}`}
        type="password"
        placeholder="비밀번호 확인"
        onChange={handleConfirmPasswordChange}
        value={confirmPassword}
      />
      {password !== confirmPassword && (
        <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
      )}
      <div>
        <input
          className={`${form.base} ${form.inputMargin}`}
          type="text"
          placeholder="이름"
          onChange={handleNameChange}
          value={name}
        />
        <p style={{ color: "red" }}>{nameError}</p>
      </div>
      <div style={{ marginBottom: "7px" }}>
        <ButtonType
          placeholder="닉네임"
          onChange={handleNickNameChange}
          value={nickname}
          onClick={handleNicknameCheck}
        />
        <p style={{ color: "red" }}>{nicknameError}</p>
      </div>
      <div className={form.findPassword}>
        <div className={form.inputMargin} onClick={OptionsClick}>
          {selectQuestion || "비밀번호 찾기 질문 "}
        </div>
        {!showOptions && (
          <VscTriangleDown
            className={form.iconStyle}
            onClick={() => setShowOptions(!showOptions)}
          />
        )}
        {showOptions && (
          <div>
            {questions.map((question, index) => (
              <p key={index} onClick={() => OptionSelect(question)}>
                {question}
              </p>
            ))}
          </div>
        )}
      </div>
      {showAddInput && (
        <div>
          <input
            style={{
              marginTop: "7px",
            }}
            className={form.findPasswordValue}
            type="text"
            placeholder={`여기에 ${selectQuestion}에 대한 값을 적어주세요`}
            onChange={handleAddInputChange}
            value={answer}
          />
          <p style={{ color: "red" }}>{answerError}</p>
        </div>
      )}
      <Primary
        text="회원가입"
        style={{ marginTop: "32px", marginBottom: "64px" }}
        onClick={handleSubmit}
      />
    </div>
  );
}

export default SignUpType;
