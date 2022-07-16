import React from 'react';
import { ServerStyleSheets } from '@material-ui/core/styles';
import Document, { Head, Html, Main, NextScript } from 'next/document';

import theme from 'styles/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <link
            rel="shortcut icon"
            href="/FrinksHighRes_Logo_Gradient_Eii_pLuqH.svg"
          />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta property="og:title" content="Frinks" />
          <meta
            property="og:description"
            content="Automating with Intelligence"
          />
          <meta
            property="og:image"
            content="https://ik.imagekit.io/xv01p8jynoe/image/Frinks_SdYPnmT2_.png"
          />
          <meta property="og:url" content="https://www.frinks.ai" />
          <meta property="og:site_name" content="Frinks" />

          <meta name="twitter:title" content="Frinks" />
          <meta
            name="twitter:description"
            content="Automating with Intelligence"
          />
          <meta
            name="twitter:image"
            content=" https://ik.imagekit.io/xv01p8jynoe/image/Frinks_SdYPnmT2_.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:image:alt"
            content="Automating with Intelligence"
          />
          <meta name="Frinks" content="Automating with Intelligence" />
          <meta
            name="Automating with Intelligence"
            content="We help businesses of the future accelerate success with data and insights"
          />
          <meta
            name="Mission and Vision"
            content="Powering AI. Empowering You."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()
    ]
  };
};
