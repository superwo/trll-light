import React, { createContext } from 'react';
import { useAuth } from '../hooks/useAuth';

export const UserContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {}
});

export const UserProvider = ({ children }) => {
  const { token, login, logout, userId } = useAuth();

  return (
    <UserContext.Provider
      value={{
        userId,
        token,
        isLoggedIn: !!token,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
