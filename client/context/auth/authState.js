import { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import axiosClient from '../../config/axios';

import { SIGNUP_SUCCESS, SIGNUP_FAILED, CLEAN_ALERT } from '../../types';

const AuthState = ({ children }) => {
  // Initial State
  const initialState = {
    token: '',
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

  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        registerUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
