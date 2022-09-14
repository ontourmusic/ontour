import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Artist from './pages/Artist';
import Review from './pages/Review';
import Navigation from './Navigation';
import Footer from './pages/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/review" element={<Review />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
