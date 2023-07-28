import Ghost from "./UI/Button/Ghost";
import Kakao from "./UI/Button/Kakao";
import Mini from "./UI/Button/Mini";
import Primary from "./UI/Button/Primary";
import Base from "./UI/Form/Base";
import ButtonType from "./UI/Form/ButtonType";
import Date from "./UI/Form/Date";
import LoginType from "./UI/Form/LoginType";
import Memo from "./UI/Form/Memo";
import Pagination from "./UI/Pagination/Pagination";
import Selector from "./UI/Form/Selector";
import Header from "./components/features/Header";

function App() {
  return (
    <>
      <Header />
    </>
    // Desktop 레이아웃
    // <div style={{ background: 'pink' }}>
    //   <div
    //     style={{
    //       margin: '0 auto',
    //       background: 'skyblue',
    //       width: '100%',
    //       maxWidth: '1140px',
    //       height: '80px',
    //     }}
    //   ></div>
    //   <div
    //     style={{
    //       display: 'flex',
    //       margin: '0 auto',
    //       background: 'white',
    //       width: '100%',
    //       maxWidth: '1140px',
    //       height: '1000px',
    //     }}
    //   >
    //     <div
    //       style={{
    //         background: 'purple',
    //         width: '25%',
    //         maxWidth: '200px',
    //         height: '1000px',
    //       }}
    //     ></div>
    //     <div
    //       style={{ background: 'yellow', width: '100%', height: '1000px' }}
    //     ></div>
    //   </div>
    // </div>

    // UI 컴포넌트
    // <div>
    //   <div>
    //     <Primary text='버튼' isShortPrimary={false} />
    //     <Primary text='버튼' isShortPrimary={true} />
    //     <Mini text='버튼' color='gray' />
    //     <Mini text='버튼' color='red' />
    //     <Ghost text='버튼' />
    //     <Kakao />
    //   </div>
    //   <div>
    //     <Base placeholder='텍스트를 입력하세요' />
    //     <ButtonType placeholder='이메일' buttonText='중복확인' />
    //     <LoginType />
    //     <Date />
    //     <Memo placeholder='메모를 입력하세요' />
    //     <Selector placeholder='옵션을 선택하세요' />
    //   </div>
    //   <div>
    //     <Pagination />
    //   </div>
    // </div>
  );
}

export default App;
