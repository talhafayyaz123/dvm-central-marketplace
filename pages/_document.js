import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
		<Html lang='en-US' dir='ltr'>
        <Head>
        <link rel="preload" href="/fonts/poppins-regular.woff2" as="font" type="font/woff2" crossorigin />
        <link rel="preload" href="/fonts/poppins-semibold.woff2" as="font" type="font/woff2" crossorigin />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }