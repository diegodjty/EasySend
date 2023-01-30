import { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import Link from 'next/link';
import Dropzone from '../components/Dropzone';
import Alert from '../components/Alert';

export default function Home() {
  // Get user from storage
  const AuthContext = useContext(authContext);
  const AppContext = useContext(appContext);
  const { authUser } = AuthContext;
  const { file_message, url } = AppContext;

  useEffect(() => {
    authUser();
  }, []);
  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <>
            <p className="text-center mt-10">
              <span className="font-bold text-red-700 text-2xl">
                Your URL is:
              </span>
              {`${process.env.frontendURL}/links/${url}`}
            </p>
            <button
              type="button"
              className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${process.env.frontendURL}/links/${url}`
                )
              }
            >
              Copy Link
            </button>
          </>
        ) : (
          <>
            {file_message && <Alert />}
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                  Easily and privately share files
                </h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">EasySend</span>{' '}
                  allows you to share files with end-to-end encryption, files
                  are deleted after being downloaded. So you can keep what you
                  share private and make sure your stuff doesn't stay online
                  forever.
                </p>
                <Link href="/signup">
                  <p className="text-red-500 font-bold text-lg hover:text-red-700">
                    Create an account for more benefites
                  </p>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
