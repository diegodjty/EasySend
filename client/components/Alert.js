import React, { useContext } from 'react';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';

const Alert = () => {
  const AuthContext = useContext(authContext);
  const AppContext = useContext(appContext);
  const { message } = AuthContext;
  const { file_message } = AppContext;
  return (
    <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
      {message || file_message}
    </div>
  );
};

export default Alert;
