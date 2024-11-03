import "./App.css";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import SuggestPage from "./pages/SuggestPage";
import { Route, Routes } from "react-router-dom";
import { useState, useRef } from "react";
import { BubblyContainer } from "react-bubbly-transitions";
import AdmissionInformationPage from "./pages/AdmissionInformationPage";
import { useLocation } from "react-router-dom";
import InfomationPage from "./pages/InformationPage";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CalculateExamScores from "./pages/CalculateExamScores";
import LoginForm from "./pages/LoginForm";
import ChatButton from "./components/ChatButton";
import HelmetComponents from "./components/HelmetComponents";
import content from "./dataStatic/metaTag";

const StyledLayoutWrap = styled.div`
  padding: ${({ state }) => (state ? "0" : "0 50px")};
  @media screen and (max-width: 576px) {
    padding: ${({ state }) => (state ? "0" : "0 10px")};
  }
`;

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/admin";

  const [refs, setRefs] = useState({
    ref1: useRef(null),
    ref2: useRef(null),
    ref3: useRef(null),
    ref4: useRef(null),
    ref5: useRef(null),
  });

  const [open, setOpen] = useState(false);
  return (
    <div className="App" style={{ width: "100%", overflow: "hidden" }}>
      <HelmetComponents
        title={content[location.pathname].title}
        description={content[location.pathname].description}
      />
      <Header refs={refs} open={open} setOpen={setOpen} />
      <StyledLayoutWrap state={hideHeader}>
        <Routes>
          <Route
            path="/"
            element={<HomePage open={open} setOpen={setOpen} />}
          ></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/xem-diem-chuan" element={<SuggestPage />}></Route>
          <Route
            path="/thong-tin-tuyen-sinh"
            element={<AdmissionInformationPage />}
          ></Route>
          <Route path="/tim-hieu-ve-nganh" element={<InfomationPage />}></Route>
          <Route path="/tinh-diem" element={<CalculateExamScores />}></Route>
          <Route path="/dang-nhap" element={<LoginForm />}></Route>
        </Routes>
        <BubblyContainer />
      </StyledLayoutWrap>
      <ChatButton refs={refs} />
      <Footer />
    </div>
  );
}

export default App;
