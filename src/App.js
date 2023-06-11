import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Account from './pages/Account';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { AuthProvider } from './components/AuthContext';

class App extends React.Component {
  render() {
    const isAuthenticated = false; // Replace with your actual authentication logic

    return (
      <Router>
        <AuthProvider>
          <div>
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/account"
                element={isAuthenticated ? <Account /> : <Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create-account" element={<SignupPage />}/>
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;