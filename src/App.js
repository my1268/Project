import React from "react";
import Header from "./components/features/Header";
import Main from "./components/pages/Main";
import MyMenu from "./components/pages/MyMenu";
import MyPlanner from "./components/pages/MyPlanner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyPasswordUpdate from "./components/pages/MyPasswordUpdate";

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mymenu" element={<MyMenu />} />
          <Route path="/mypasswordupdate" element={<MyPasswordUpdate />} />
          <Route path="/myplanner" element={<MyPlanner />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
