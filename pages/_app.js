import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { GlobalProvider } from 'context/GlobalContext';
import { SocketContext, socket } from 'context/SocketContext';
import CheckAuth from 'components/CheckAuth';

import Head from 'next/head';
import PropTypes from 'prop-types';

import theme from 'styles/theme';
import 'styles/globalStyles.css';

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnmount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 86400000
          }
        }
      })
  );

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>ACC | Frinks</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SocketContext.Provider value={socket}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <GlobalProvider>
                <CheckAuth>
                  <Component {...pageProps} />
                </CheckAuth>
              </GlobalProvider>
            </Hydrate>
          </QueryClientProvider>
        </SocketContext.Provider>
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};
