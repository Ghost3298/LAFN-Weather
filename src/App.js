import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./components/Main";
import Nav from "./components/Nav";
import Impact from "./components/Impact";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Nav />
      
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/impact" element={<Impact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
