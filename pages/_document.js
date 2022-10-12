import { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="google" content="notranslate" />
        <link rel="shortcut icon" href="/favicon.jpeg" />
        <script type="text/javascript" async src="https://s3.tradingview.com/tv.js" />
        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:image" content="/share-image.png"></meta>
        <meta property="og:url" content="https://data.worthrises.org" />
        <meta property="og:title" content="The Prison Industry Corporate Database" />
        <meta property="og:description" content="The prison industry is comprised of over 4,000 corporations that profit off of incarceration. These corporations have a vested financial interest in expanding the reach of our carceral system and worsening the incredible harm it causes at the expense of public safety. It’s time we learn their names and get to know them." />
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
