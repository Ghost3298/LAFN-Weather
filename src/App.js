import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

//Importing Components
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Forecast from "./components/Forecast";
import Impact from "./components/Impact";
import History from "./components/History";
import NavigationalWarnings from "./components/NavigationalWarnings";
import Documentations from "./components/Documentations";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
      
        <div className="Main">
          <Routes>
            <Route path="/" element={<Home />} />     
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/history" element={<History />} />
            <Route path="/navigational-warnings" element={<NavigationalWarnings />} />
            <Route path="/documentations" element={<Documentations />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
