// _app.tsx
import '../styles/globals.css'

import type { AppProps } from 'next/app';
import Footer from './components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div >
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;