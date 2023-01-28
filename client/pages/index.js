import { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';
import Link from 'next/link';
import Dropzone from '../components/Dropzone';

export default function Home() {
  // Get user from storage
  const AuthContext = useContext(authContext);
  const { authUser } = AuthContext;

  useEffect(() => {
    authUser();
  }, []);
  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
          <Dropzone />
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
            <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
              Easily and privately share files
            </h2>
            <p className="text-lg leading-loose">
              <span className="text-red-500 font-bold">EasySend</span> allows
              you to share files with end-to-end encryption, files are deleted
              after being downloaded. So you can keep what you share private and
              make sure your stuff doesn't stay online forever.
            </p>
            <Link href="/signup">
              <p className="text-red-500 font-bold text-lg hover:text-red-700">
                Create an account for more benefites
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
