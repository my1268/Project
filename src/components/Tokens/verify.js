const jwt = require("jsonwebtoken");

export const verifyToken = () => {
  // JWT 토큰 문자열
  const token = localStorage.getItem("token");

  // JWT 비밀 키 (토큰을 생성할 때 사용한 키와 일치해야 함)
  const secretKey = "VHJhdmVsR3VpZGVKd3RTZWNyZXRLZXkK";

  try {
    // JWT 토큰을 해석하여 토큰의 내용을 추출
    const decoded = jwt.verify(token, secretKey);

    // 토큰의 내용 출력
    console.log("토큰 내용:", decoded);

    // 토큰 내용 중 필요한 데이터 추출
    const userId = decoded.userId;
    const username = decoded.username;

    console.log("사용자 ID:", userId);
    console.log("사용자 이름:", username);
  } catch (error) {
    // 토큰이 유효하지 않거나 해석할 수 없는 경우 에러 처리
    console.error("토큰 해석 오류:", error);
  }
};
