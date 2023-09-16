import React from "react";
import Header from "./components/features/Header";
import Main from "./components/pages/Main";
import MyMenu from "./components/pages/MyMenu";
import MyPlanner from "./components/pages/MyPlanner";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import MyPasswordUpdate from "./components/pages/MyPasswordUpdate";
import MakingPlanner from "./components/pages/MakingPlanner";
import MyPost from "./components/pages/MyPost";
import MyInquiry from "./components/pages/MyInquiry";
import ReviewPost from "./components/pages/ReviewPost";
import PlaceSearch from "./components/pages/PlaceSearch";
import MyInquiryWrite from "./components/pages/MyInquiryWrite";
import PlannerPost from "./components/pages/PlannerPost";
import ReviewWriteModal from "./UI/Modal/ReviewWriteModal";

function App() {
  return (
    <Router>
      <HeaderHide />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mymenu" element={<MyMenu />} />
        <Route path="/mypasswordupdate" element={<MyPasswordUpdate />} />
        <Route path="/myplanner" element={<MyPlanner />} />
        <Route path="/mypost" element={<MyPost />} />
        <Route path="/myinquiry" element={<MyInquiry />} />
        <Route path="/myinquirywrite" element={<MyInquiryWrite />} />
        <Route path="/makingplanner" element={<MakingPlanner />} />
        <Route path="/plannerpost" element={<PlannerPost />} />
        <Route path="/reviewpost" element={<ReviewPost />} />
        <Route path="/reviewwritemodal" element={<ReviewWriteModal />} />
        <Route path="/placesearch" element={<PlaceSearch />} />
      </Routes>
    </Router>
  );
}

function HeaderHide() {
  const location = useLocation();
  const hideHeader = location.pathname === "/placesearch";
  return hideHeader ? null : <Header />;
}

export default App;
