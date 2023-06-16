import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const login = (userData) => {
    // Si la connexion réussit
    setLoggedIn(true);
    setUserData(userData);
  };

  const logout = () => {
    setLoggedIn(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};