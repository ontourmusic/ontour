import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Artist from './pages/Artist';
import Results from './pages/Results';
import Venue from './pages/Venue';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/artist" element={<Artist/>} />
          <Route path="/results" element={<Results/>} />
          <Route path="/venue" element={<Venue/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
