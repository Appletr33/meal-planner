// _app.tsx
import type { AppProps } from 'next/app';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import styles from '../styles/App.module.css'; // Assuming your global CSS module

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;