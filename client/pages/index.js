import { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';

export default function Home() {
  // Get user from storage
  const AuthContext = useContext(authContext);
  const { authUser } = AuthContext;

  useEffect(() => {
    authUser();
  }, []);
  return (
    <Layout>
      <h1>Index</h1>
    </Layout>
  );
}
