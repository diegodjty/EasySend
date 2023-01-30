import {
  CLEAN_ALERT,
  SHOW_ALERT,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILED,
  CREATE_LINK_SUCCESS,
  CREATE_LINK_FAILED,
  UPLOAD_FILE,
  CLEAN_STATE,
} from '../../types';
export default (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        file_message: action.payload,
      };
    case CLEAN_ALERT:
      return {
        ...state,
        file_message: null,
      };
    case UPLOAD_FILE:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        original_name: action.payload.original_name,
        loading: false,
      };
    case UPLOAD_FILE_FAILED:
      return {
        ...state,
        file_message: action.payload,
        loading: false,
      };
    case CREATE_LINK_SUCCESS:
      return {
        ...state,
        url: action.payload,
      };
    case CLEAN_STATE:
      return {
        ...state,
        file_message: '',
        name: '',
        original_name: '',
        loading: false,
        downloads: 1,
        password: '',
        author: null,
        url: '',
      };
    default:
      return state;
  }
};
