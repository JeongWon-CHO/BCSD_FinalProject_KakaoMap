import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './page/MainPage';
import MapPage from './page/MapPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/map/*" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
