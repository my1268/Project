import React from "react";
import Header from "./components/features/Header";
import Main from "./components/pages/Main";
import MakingPlanner from "./components/pages/MakingPlanner";
import MyMenu from "./components/pages/MyMenu";
import MyPlanner from "./components/pages/MyPlanner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/makingplanner" element={<MakingPlanner />} />
          <Route path="/mymenu" element={<MyMenu />} />
          <Route path="/myplanner" element={<MyPlanner />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
