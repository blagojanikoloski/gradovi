import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <div>
        {/* You can add a common header or navigation bar here */}
        
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<LandingPage />} />
          {/* Add more routes as needed */}
        </Routes>
        
        {/* You can add a common footer here */}
      </div>
    </Router>
  );
}

export default App;
