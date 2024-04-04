import '../styles/global.scss';
import '../styles/picker.scss';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import { NEXT_PUBLIC_GOOGLE_ANALYTICS } from 'constants/urls';

import { apolloClient } from 'api/client';

import { isWindow } from 'helpers';

import { Lang } from 'enums/lang';

import { IntlContext } from 'context/intl';
import { AuthProvider } from 'context/auth';

import { messages } from 'config/messages';

import * as gtag from 'lib/gtag';

import ErrorBoundary from 'components/Error/Boundary';

interface Props extends AppProps {
  isSsr: boolean;
}

function App(props: Props) {
  const { Component, pageProps, isSsr = false } = props;

  const { events } = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (isWindow()) {
        gtag.pageview(url);
      }
    };

    events.on('routeChangeComplete', handleRouteChange);

    return () => {
      events.off('routeChangeComplete', handleRouteChange);
    };
  }, [events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Script
        id="gtm"
        strategy="worker"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${NEXT_PUBLIC_GOOGLE_ANALYTICS}');
            `,
        }}
      />
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
             `,
        }}
      />

      <Script
        id="facebook"
        strategy="worker"
        src="https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v16.0"
      ></Script>

      <AuthProvider>
        <IntlContext.Provider value={messages[Lang.th]}>
          <ApolloProvider client={apolloClient}>
            <ErrorBoundary>
              <Component {...{ isSsr, ...pageProps }} />
            </ErrorBoundary>
          </ApolloProvider>
        </IntlContext.Provider>
      </AuthProvider>
    </>
  );
}

export default App;
