import Layout from '../../components/Layout';
import axiosClient from '../../config/axios';
import React, { useState, useContext } from 'react';
import appContext from '../../context/app/appContext';
import Alert from '../../components/Alert';

export async function getStaticProps({ params }) {
  const { link } = params;
  const result = await axiosClient.get(`/api/links/${link}`);

  return {
    props: {
      link: result.data,
    },
  };
}

export async function getStaticPaths() {
  const links = await axiosClient.get('/api/links');

  return {
    paths: links.data.links.map((link) => ({
      params: { link: link.url },
    })),
    fallback: false,
  };
}

export default ({ link }) => {
  const [hasPassword, setHaspassword] = useState(link.password);
  const [password, setPassword] = useState('');
  const AppContext = useContext(appContext);
  const { showAlert, file_message } = AppContext;

  const verifyPassword = async (e) => {
    e.preventDefault();
    const data = {
      password,
    };

    try {
      const result = await axiosClient.post(`/api/links/${link.link}`, data);
      setHaspassword(result.data.password);
    } catch (error) {
      showAlert(error.response.data.msg);
    }
  };
  return (
    <Layout>
      {hasPassword ? (
        <>
          <p className="text-center">This link is protected by a password</p>
          {file_message && <Alert />}
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => verifyPassword(e)}
              >
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-black text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    placeholder="File Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                  value="Validate Password"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Download your files
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`${process.env.backendURL}/api/files/${link.file}`}
              className="bg-red-500 text-center px-10 py-3 uppercase font-bold text-white cursor-pointer"
              download
            >
              Here
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};
