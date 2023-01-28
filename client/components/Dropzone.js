import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axiosClient from '../config/axios';

const Dropzone = () => {
  const onDropAccepted = useCallback(async (acceptedFiles) => {
    console.log(acceptedFiles);

    // Create a form data
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    const result = await axiosClient.post('/api/files', formData);
    console.log(result.data);
  }, []);

  const onDropRejected = () => {
    console.log('rejected');
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDropAccepted, onDropRejected, maxSize: 2000 });

  const createLink = () => {
    console.log('creating link');
  };

  const files = acceptedFiles.map((file) => (
    <li
      key={file.lastModified}
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
    >
      <p className="font-bold text-xl">{file.path}</p>
      <p className="text-sm text-gray-500">
        {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col justify-center items-center border-dashed border-gray-400 border-2 bg-gray-100">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4"></h4>
          <ul>{files}</ul>
          <button
            className="bg-blue-700 w-[95%] m-auto py-3 rounded-lg text-white my-10 hover:bg-blue-800"
            type="button"
            onClick={() => createLink()}
          >
            Create Link
          </button>
        </div>
      ) : (
        <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
          <input className="h-100" {...getInputProps()} />

          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600 ">Drop here</p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600 ">
                {' '}
                Select a file and drag it here
              </p>
              <button
                type="button"
                className="bg-blue-700 w-[95%] m-auto py-3 rounded-lg text-white my-10 hover:bg-blue-800 "
              >
                Select file to upload
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
