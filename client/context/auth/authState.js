import { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  CLEAN_ALERT,
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
  AUTH_USER,
  SIGNOUT
} from '../../types';

const AuthState = ({ children }) => {
  // Initial State
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
    authenticated: null,
    user: null,
    message: null,
  };
  // Define Reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register new user
  const registerUser = async (data) => {
    try {
      const response = await axiosClient.post('/api/users', data);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: response.data.msg,
      });

      setTimeout(() => {
        dispatch({
          type: CLEAN_ALERT,
        });
      }, 2000);
    } catch (error) {
      dispatch({
        type: SIGNUP_FAILED,
        payload: error.response.data.msg,
      });
    }
  };

  const signIn = async (data) => {
    try {
      const response = await axiosClient.post('/api/auth', data);
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: response.data.token,
      });
      setTimeout(() => {
        dispatch({
          type: CLEAN_ALERT,
        });
      }, 2000);
    } catch (error) {
      dispatch({
        type: SIGNIN_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // Get auth user from JWT
  const authUser = async () => {
    const token = localStorage.getItem('es_token');
    if (token) {
      tokenAuth(token);
    }
    try {
      const response = await axiosClient.get('/api/auth');
      dispatch({
        type: AUTH_USER,
        payload: response.data.user,
      });
    } catch (error) {
      dispatch({
        type: SIGNIN_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // Sign out
  const signOut = () => {
    dispatch({
      type: SIGNOUT,
    })
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        registerUser,
        signIn,
        authUser,
        signOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
