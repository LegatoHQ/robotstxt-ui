import { Head, Html, Main, NextScript } from 'next/document'

import { APP_CONFIG } from '@/lib/constants'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={APP_CONFIG.title} />
        <meta property="twitter:title" content={APP_CONFIG.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={APP_CONFIG.canonical} />
        <meta property="twitter:url" content={APP_CONFIG.canonical} />
        <meta property="og:image" content={APP_CONFIG.previewImg} />
        <meta property="twitter:image" content={APP_CONFIG.previewImg} />
        {!!APP_CONFIG.description && (
          <>
            <meta property="og:description" content={APP_CONFIG.description} />
            <meta name="twitter:description" content={APP_CONFIG.description} />
            <meta name="description" content={APP_CONFIG.description} />
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={APP_CONFIG.site_name} />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script async src="//static.getclicky.com/101398250.js"></script>
<noscript><p><img alt="Clicky" width="1" height="1" src="//in.getclicky.com/101398250ns.gif" /></p></noscript>
      </body>
    </Html>
  )
}
