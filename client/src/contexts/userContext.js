import React, { createContext } from 'react';
import { useAuth } from '../hooks/useAuth';

export const UserContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  name: null,
  login: () => {},
  logout: () => {}
});

export const UserProvider = ({ children }) => {
  const { token, login, logout, userId, name } = useAuth();

  return (
    <UserContext.Provider
      value={{
        userId,
        token,
        name,
        isLoggedIn: !!token,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
