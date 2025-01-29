import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Random from './components/Random';
import Generate from './components/Generate';
import toast, { Toaster } from 'react-hot-toast';
import AIComponent from './components/AIComponent';

const App = () => {
  // Check if user is already logged in from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Get the token from localStorage
    return localStorage.getItem('authToken') ? true : false;
  });

  const handleLoginSuccess = (token) => {
    localStorage.setItem('authToken', token); // Store token
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/auth"
          element={isLoggedIn ? <Navigate to="/random" /> : <Auth onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/random"
          element={isLoggedIn ? <Random /> : <Navigate to="/auth" />}
        />
        <Route
          path="/generate"
          element={isLoggedIn ? <Generate /> : <Navigate to="/auth" />}
        />

        <Route
          path="/AI"
          element={isLoggedIn ? <AIComponent /> : <Navigate to="/auth" />}
        />
        <Route path="/" element={isLoggedIn ? <Navigate to="/random" /> : <Navigate to="/auth" />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
