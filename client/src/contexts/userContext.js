import React, { createContext, useReducer } from 'react';
import { useCookies } from 'react-cookie';
import {
  USER_LOGIN,
  ERROR_LOGIN,
  CLEAR_AUTH_ERRORS,
  USER_LOGOUT
} from './types';
import { loginUser, registerUser, authenticate } from '../services/auth';

export const UserContext = createContext();
const initialState = { user: null, isAuthenticated: false, errorMessage: '' };

const reducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        errorMessage: ''
      };
    case ERROR_LOGIN:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessage: action.payload.message
      };
    case USER_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessage: ''
      };
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        errorMessage: ''
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cookieService = useCookies(['w_auth']);

  const authenticateUser = async () => {
    const userData = await authenticate();
    if (userData.isAuth) {
      dispatch({
        type: USER_LOGIN,
        payload: { user: { name: userData.name, email: userData.email } }
      });
    } else {
      dispatch({
        type: ERROR_LOGIN,
        payload: { message: 'Authentication Failed' }
      });
      setTimeout(clearAuthErrors, 2000);
    }
  };

  const userLogin = async data => {
    if (data) {
      if (data.loginSuccess) {
        await authenticateUser();
      } else {
        dispatch({ type: ERROR_LOGIN, payload: data });
        setTimeout(clearAuthErrors, 2000);
      }
      console.log(data);
    } else {
      dispatch({
        type: ERROR_LOGIN,
        payload: { message: 'Something goes wrong. Try again.' }
      });
      setTimeout(clearAuthErrors, 2000);
    }
  };

  const login = async userData => {
    const data = await loginUser(userData);
    userLogin(data);
  };

  const register = async userData => {
    const data = await registerUser(userData);
    userLogin(data);
  };

  const logout = () => {
    cookieService[2]();
    dispatch({ type: USER_LOGOUT });
  };

  const clearAuthErrors = () => {
    console.log('clearAuthErrors');
    dispatch({ type: CLEAR_AUTH_ERRORS });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        errorMessage: state.errorMessage,
        login,
        logout,
        register,
        authenticateUser,
        clearAuthErrors
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
