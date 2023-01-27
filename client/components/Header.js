import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="py-8 flex felx-col md:flex-row item-center justify-between">
      <Link href="/">
        <img className="w-64 mb-8 md:mb-0" src="logo.png" alt="" />
      </Link>
      <div>
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
      </div>
    </header>
  );
};

export default Header;
