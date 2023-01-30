import React, { useReducer } from 'react';
import appContext from './appContext.js';
import appReducer from './appReducer.js';
import axiosClient from '../../config/axios.js';
import {
  CLEAN_ALERT,
  SHOW_ALERT,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILED,
  UPLOAD_FILE,
  CREATE_LINK_SUCCESS,
  CREATE_LINK_FAILED,
} from '../../types';

const AppState = ({ children }) => {
  const initialState = {
    file_message: '',
    name: '',
    original_name: '',
    loading: false,
    downloads: 1,
    password: '',
    author: null,
    url: '',
  };

  const [state, dispatch] = useReducer(appReducer, initialState);
  const showAlert = (msg) => {
    dispatch({
      type: SHOW_ALERT,
      payload: msg,
    });
    setTimeout(() => {
      dispatch({
        type: CLEAN_ALERT,
      });
    }, 3000);
  };

  // Upload file to server

  const uploadFile = async (formData, fileName) => {
    dispatch({
      type: UPLOAD_FILE,
    });

    try {
      const result = await axiosClient.post('/api/files', formData);
      dispatch({
        type: UPLOAD_FILE_SUCCESS,
        payload: { name: result.data.file, original_name: fileName },
      });
    } catch (error) {
      dispatch({
        type: UPLOAD_FILE_FAILED,
        payload: error.response.data.msg,
      });
    }
  };

  // Create a link when file uploads
  const createLink = async () => {
    const data = {
      name: state.name,
      original_name: state.original_name,
      downloads: state.downloads,
      password: state.password,
      author: state.author,
    };

    try {
      const result = await axiosClient.post('/api/links', data);
      dispatch({
        type: CREATE_LINK_SUCCESS,
        payload: result.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <appContext.Provider
      value={{
        file_message: state.file_message,
        name: state.name,
        original_name: state.original_name,
        loading: state.loading,
        downloads: state.downloads,
        password: state.password,
        author: state.author,
        url: state.url,
        showAlert,
        uploadFile,
        createLink,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
