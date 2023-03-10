import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Artist from './pages/Artist';
import Results from './pages/Results';
import Venue from './pages/Venue';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './Styles/FontTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/artist" element={<Artist/>} />
          <Route path="/results" element={<Results/>} />
          <Route path="/venue" element={<Venue/>} />
        </Routes>
      </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
