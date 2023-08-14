import React, { useEffect } from "react";
import button from "../Button/Button.module.css";

function KakaoLoginApi({ style }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    document.head.appendChild(script);

    script.onload = () => {
      window.Kakao.init("a0e3e9c4cf7b62b0bc0815bafc672e41");
      console.log("isInitialized? : " + window.Kakao.isInitialized());
    };
  }, []);

  const kakaoLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log(authObj);
        console.log("액세스 토큰: " + authObj.access_token);

        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (response) => {
            console.log(response);
            console.log(response.kakao_account.email);
            console.log(response.kakao_account.profile.nickname);

            const url =
              "http://ec2-43-201-8-237.ap-northeast-2.compute.amazonaws.com:8080/kakaoLogin";
            const data = {
              email: response.kakao_account.email,
              nickname: response.kakao_account.profile.nickname,
            };

            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.text())
              .then((result) => {
                const jwt = result;

                console.log("JWT TOKEN: " + jwt);

                localStorage.setItem("jwt", jwt);

                window.location.href =
                  "http://ec2-43-201-8-237.ap-northeast-2.compute.amazonaws.com:8080/index";
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          },
          fail: (error) => {
            console.log(error);
          },
        });
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <button style={style} className={button.kakao} onClick={kakaoLogin}>
        카카오 로그인
      </button>
    </>
  );
}
export default KakaoLoginApi;
