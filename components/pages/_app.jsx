// pages/_app.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider } from '../../context/AuthContext';
import { MoodProvider } from '../context/MoodContext';
import { JournalProvider } from '../context/JournalContext';
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <AuthProvider>
      <MoodProvider>
        <JournalProvider>
          <Layout>
            {loading ? (
              <div className="loading-screen">
                <div className="mascot-animation">
                  <div className="melo-mascot"></div>
                </div>
                <p>Loading...</p>
              </div>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </JournalProvider>
      </MoodProvider>
    </AuthProvider>
  );
}

export default MyApp;