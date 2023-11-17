// import CloseIcon from "@mui/icons-material/Close";
import "../../style/register.scss";
import Image from 'next/image'

export default function Register() {
  return (
    <div id="container">
      <div id="x-div">
        {/* <CloseIcon id="x" /> */}
        <hr />
      </div>
      <section id="main">
        <p>회원가입</p>
        <form>
          {/* 이메일 👉🏻 이메일 형식 유효성 검사*/}
          <div id="div_email">
            <label htmlFor="email">이메일</label>
            <div>
              <input type="email" id="email" />
              <button id="btn_verify">인증</button>
            </div>
          </div>
          {/* 이름*/}
          <div>
            <label htmlFor="name">이름</label>
            <input type="text" id="name" />
          </div>
          {/* 닉네임 👉🏻 중복검사*/}
          <div>
            <label htmlFor="nickname">닉네임</label>
            <input type="text" id="nickname" />
          </div>
          {/* 비밀번호 👉🏻 중복검사 & 유효성 검사*/}
          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호(8~20자 영문, 숫자, 특수기호 조합)"
            />
            <input
              type="password"
              id="re-password"
              placeholder="비밀번호 확인"
            />
          </div>
          {/* <br />
          <br />
          <br /> */}
          <button id="btn_register">옷늘 캐스터 등록</button>
        </form>
      </section>
      <footer>옷늘날씨</footer>
    </div>
  );
}
