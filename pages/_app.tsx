import { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '../src/theme';
import '../src/styles/main.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
    // console.log('Is in maintenance mode: ', process.env.MAINTENANCE_MODE === 'true');
  }, []);

  return (
    <>
      <Head>
        <title>React Editor</title>
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap'
          rel='stylesheet'
        />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
