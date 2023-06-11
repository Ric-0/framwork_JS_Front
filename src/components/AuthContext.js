import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const login = (userData) => {
    // Effectuez ici votre logique de connexion et vérification des identifiants

    // Si la connexion réussit
    setLoggedIn(true);
    setUserData(userData);
  };

  const logout = () => {
    // Effectuez ici votre logique de déconnexion

    setLoggedIn(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};