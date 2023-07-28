import React, { useState } from "react";
import form from "./Form.module.css";
import { VscTriangleDown } from "react-icons/vsc";
import ButtonType from "./ButtonType";

function SignUpType({ style }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectQuestion, setSelectQuestion] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);
  const OptionsClick = () => {
    setShowOptions(!showOptions);
  };

  const questions = ["질문 1", "질문 2", "질문 3"];

  const OptionSelect = (question) => {
    setSelectQuestion(question);
    setShowOptions(false);
    setShowAddInput(true);
  };

  return (
    <div style={style} className={form.loginType}>
      <div style={{ marginBottom: "7px" }}>
        <ButtonType placeholder="이메일" />
      </div>
      <input
        className={`${form.base} ${form.inputMargin}`}
        type="password"
        placeholder="비밀번호"
      />
      <input
        className={`${form.base} ${form.inputMargin}`}
        type="password"
        placeholder="비밀번호 확인"
      />
      <div>
        <input
          className={`${form.base} ${form.inputMargin}`}
          type="text"
          placeholder="이름"
        />
      </div>
      <div style={{ marginBottom: "7px" }}>
        <ButtonType placeholder="닉네임" />
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
          />
        </div>
      )}
    </div>
  );
}

export default SignUpType;
