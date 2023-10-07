import React, { useState } from "react";
import form from "./Form.module.css";
import { VscTriangleDown } from "react-icons/vsc";
import Primary from "../Button/Primary";
import axios from "axios";

function PasswordType({ style, setShowNewPassword }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectQuestion, setSelectQuestion] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState("");

  const OptionsClick = () => {
    setShowOptions(!showOptions);
  };

  const questions = [1, 2, 3];

  const OptionSelect = (question) => {
    setSelectQuestion(question);
    setShowOptions(false);
    setShowAddInput(true);
  };

  const handleConfirm = async () => {
    const data = {
      email,
      name,
      questionId: selectQuestion,
      answer,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/member/checkAnswer",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        localStorage.setItem("email", email);
        setShowNewPassword(true);
      } else {
        alert("비밀번호 초기화 실패");
      }
    } catch (error) {
      console.error("Error checking identity:", error);
    }
  };

  return (
    <div style={style} className={form.loginType}>
      <input
        className={`${form.base} ${form.inputMargin}`}
        type="text"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={`${form.base} ${form.inputMargin}`}
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      )}
      <Primary
        onClick={handleConfirm}
        text="확인"
        style={{ marginBottom: "64px", marginTop: "16px" }}
      />
    </div>
  );
}

export default PasswordType;
