import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
const Header = () => {
  // Get user from storage
  const AuthContext = useContext(authContext);
  const { authUser, user, signOut } = AuthContext;

  useEffect(() => {
    authUser();
  }, []);
  return (
    <header className="py-8 flex felx-col md:flex-row item-center justify-between">
      <Link href="/">
        <img className="w-64 mb-8 md:mb-0" src="/logo.png" alt="" />
      </Link>
      <div>
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
              className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-black px-5 py-3 rounded text-white font-bold uppercase"
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
