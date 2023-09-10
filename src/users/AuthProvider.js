// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check user authentication status on component mount
  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);
    } catch (error) {
      setUser(null);
    }
  };

  const value = { user, setUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
