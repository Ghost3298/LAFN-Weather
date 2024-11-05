import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./components/Main";
import Nav from "./components/Nav";
import Impact from "./components/Impact";
import './App.css';
import Footer from "./components/Footer";
import Predictions from "./components/Predictions";
import AboutUs from "./components/AboutUs";
import NavigationalWarnings from "./components/NavigationalWarnings";
function App() {
  return (
    <div className="App">
      <Router>
      <Nav />
      
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/navigationalWarnings" element={<NavigationalWarnings />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
