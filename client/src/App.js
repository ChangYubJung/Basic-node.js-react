import React from "react";
import {
  BrowserRouter as Router,
  Routes, //Switch가 Routes로 변경됨.
  Route,
  //Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';


function App() {
//Router은 부분적으로 닮아도 같은거라고 인식 그래서 그 부분을 없애기 위해서 exact를 넣는다.
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/login" element={<LoginPage/>} />
        <Route exact path="/register" element={<RegisterPage/>} />
      </Routes>
    </Router>
  );
}

export default App;

