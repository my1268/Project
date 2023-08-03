import React from "react";
import Categories from "../features/Categories";
import PageCover from "../features/PageCover";
import myMenu from "./MyMenu.module.css";
import Base from "../../UI/Form/Base";
import Primary from "../../UI/Button/Primary";

function MyMenu() {
  return (
    <>
      <PageCover title="마이페이지" />
      <div className="layout">
        <Categories />
        <div className="container">
          <form className={myMenu.form}>
            <dl className={myMenu.list}>
              <div className={myMenu.item}>
                <dt>이메일</dt>
                <dd>1234@gmail.com</dd>
              </div>
              <div className={myMenu.item}>
                <dt>이름</dt>
                <dd>
                  <Base placeholder="홍길동" />
                </dd>
              </div>
              <div className={myMenu.item}>
                <dt>닉네임</dt>
                <dd>
                  <Base placeholder="고길동" />
                </dd>
              </div>
            </dl>
            <Primary text="회원 정보 수정" />
          </form>
        </div>
      </div>
    </>
  );
}

export default MyMenu;
