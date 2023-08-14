import React, { useEffect } from "react";

function KakaoLogoutApi() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    document.head.appendChild(script);

    script.onload = () => {
      window.Kakao.init("a0e3e9c4cf7b62b0bc0815bafc672e41");
      console.log("isInitialized? : " + window.Kakao.isInitialized());
    };
  }, []);

  const kakaoLogout = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      window.Kakao.API.request({
        url: "/v1/user/unlink",
        success: (response) => {
          console.log(response);

          localStorage.removeItem("jwt");

          window.location.href =
            "http://ec2-43-201-8-237.ap-northeast-2.compute.amazonaws.com:8080/index";
        },
        fail: (error) => {
          console.log("ERROR!: " + error);
        },
      });

      window.Kakao.Auth.setAccessToken("undefined");
    }
  };
  return (
    <>
      <button onClick={kakaoLogout}>카카오 로그아웃</button>
    </>
  );
}
export default KakaoLogoutApi;
