import React, { useState, useContext } from 'react';
import appContext from '../context/app/appContext';

const Form = () => {
  const [hasPassword, setHasPassword] = useState(false);
  const AppContext = useContext(appContext);
  const { addPassword, addNumberOfDownloads } = AppContext;
  return (
    <div className="w-full mt-20 p">
      <div>
        <label className="text-lg text-gray-800">Delete after</label>
        <select
          className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
          onChange={(e) => addNumberOfDownloads(parseInt(e.target.value))}
          defaultValue={'DEFAULT'}
        >
          <option value="DEFAULT" selected disabled>
            -- Select --
          </option>
          <option value="1">1 Download</option>
          <option value="5">5 Downloads</option>
          <option value="10">10 Downloads</option>
          <option value="20">20 Downloads</option>
        </select>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label className="text-lg text-gray-800 mr-2">
            Protect with password
          </label>
          <input
            type="checkbox"
            onChange={() => setHasPassword(!hasPassword)}
          />
        </div>
        {hasPassword ? (
          <input
            type="password"
            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
            onChange={(e) => addPassword(e.target.value)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Form;
