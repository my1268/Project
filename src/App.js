import React from "react";
import Header from "./components/features/Header";
import Main from "./components/pages/Main";
import MyMenu from "./components/pages/MyMenu";
import MyPlanner from "./components/pages/MyPlanner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyPasswordUpdate from "./components/pages/MyPasswordUpdate";
import MakingPlanner from "./components/pages/MakingPlanner";
import MyPost from "./components/pages/MyPost";
import MyComment from "./components/pages/MyComment";
import ReviewPost from "./components/pages/ReviewPost";
import ReviewWrite from "./components/pages/ReviewWrite";
import PlaceSearch from "./components/pages/PlaceSearch";

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
          <Route path="/mypost" element={<MyPost />} />
          <Route path="/mycomment" element={<MyComment />} />
          <Route path="/makingplanner" element={<MakingPlanner />} />
          <Route path="/reviewpost" element={<ReviewPost />} />
          <Route path="/reviewwrite" element={<ReviewWrite />} />
          <Route path="/placesearch" element={<PlaceSearch />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
