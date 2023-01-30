import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  CLEAN_ALERT,
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
  AUTH_USER,
  SIGNOUT,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case SIGNUP_FAILED:
    case SIGNIN_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAN_ALERT:
      return {
        ...state,
        message: null,
      };
    case SIGNIN_SUCCESS:
      localStorage.setItem('es_token', action.payload);
      return {
        ...state,
        tokin: action.payload,
        authenticated: true,
      };
    case AUTH_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case SIGNOUT:
      localStorage.removeItem('es_token');
      return {
        ...state,
        user: null,
        token: null,
        authenticated: null,
      };
    default:
      return state;
  }
};
