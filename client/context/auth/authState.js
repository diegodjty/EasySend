import { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import { AUTH_USER } from '../../types';

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
  const registerUser = (datos) => {
    console.log(datos);
  };

  // Auth User
  const authUser = (name) => {
    dispatch({
      type: AUTH_USER,
      payload: name,
    });
  };
  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        registerUser,
        authUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
