import React from 'react';
import Head from 'next/head';
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>EasySend</title>
      </Head>
      <img src="logo.png" alt="" />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto">
          <main className="mt-20">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
