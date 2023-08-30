import React from "react";
import form from "./Form.module.css";

function LoginType({ style, email, password, setEmail, setPassword }) {
  return (
    <div style={style} className={form.loginType}>
      <input
        className={form.base}
        type="text"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={form.base}
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}

export default LoginType;
