import Ghost from './UI/Button/Ghost';
import Kakao from './UI/Button/Kakao';
import Mini from './UI/Button/Mini';
import Primary from './UI/Button/Primary';
import Base from './UI/Form/Base';
import ButtonType from './UI/Form/ButtonType';
import Date from './UI/Form/Date';
import LoginType from './UI/Form/LoginType';
import Memo from './UI/Form/Memo';
import Pagination from './UI/Pagination/Pagination';
import Selector from './UI/Form/Selector';

function App() {
  return (
    <div>
      <div>
        <Primary text='버튼' isShortPrimary={false} />
        <Primary text='버튼' isShortPrimary={true} />
        <Mini text='버튼' color='gray' />
        <Mini text='버튼' color='red' />
        <Ghost text='버튼' />
        <Kakao />
      </div>
      <div>
        <Base placeholder='텍스트를 입력하세요' />
        <ButtonType placeholder='이메일' buttonText='중복확인' />
        <LoginType />
        <Date />
        <Memo placeholder='메모를 입력하세요' />
        <Selector placeholder='옵션을 선택하세요' />
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
}

export default App;
