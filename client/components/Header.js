import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router';
const Header = () => {
  // Get user from storage
  const AuthContext = useContext(authContext);
  const { authUser, user, signOut } = AuthContext;
  const AppContext = useContext(appContext);
  const { cleanState } = AppContext;

  const router = useRouter();

  useEffect(() => {
    authUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirect = () => {
    router.push('/');
    cleanState();
  };
  return (
    <header className="py-5 flex flex-col justify-center items-center md:flex-row md:justify-between">
      <img
        className="w-64 mb-8 md:mb-0 cursor-pointer "
        src="/logo.png"
        alt=""
        onClick={() => redirect()}
      />

      <div className="flex justify-center">
        {user ? (
          <div className="flex items-center">
            <p className="mr-2">Hi! {user.name}</p>
            <button
              type="button"
              className="bg-black px-5 py-3 rounded text-white font-bold uppercase"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2 md:h-2/3"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-black px-5 py-3 rounded text-white font-bold uppercase md:h-2/3"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
