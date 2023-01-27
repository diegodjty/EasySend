import { SIGNUP_SUCCESS, SIGNUP_FAILED, CLEAN_ALERT } from '../../types';

export default (state, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case SIGNUP_FAILED:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAN_ALERT:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
