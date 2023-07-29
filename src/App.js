import Header from './components/features/Header';
import Main from './components/pages/Main';
import MakingPlanner from './components/pages/MakingPlanner';
import MyMenu from './components/pages/MyMenu';
import MyPlanner from './components/pages/MyPlanner';

function App() {
  return (
    <>
      {/* 고정 */}
      <Header />

      {/* 아래 컴포넌트를 하나씩 열어보세요 */}
      <Main />
      {/* <MakingPlanner /> */}
      {/* <MyMenu /> */}
      {/* <MyPlanner /> */}
    </>
  );
}

export default App;
