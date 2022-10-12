import { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="google" content="notranslate" />
        <link rel="shortcut icon" href="/favicon.jpeg" />
        <script type="text/javascript" async src="https://s3.tradingview.com/tv.js" />
        <meta name="twitter:image" content="/share-image.png" />
        <meta property="og:image" content="/share-image.png" />
      </Head>
      <body>
        {/* Make Color mode to persists when you refresh the page. */}
        <ColorModeScript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
