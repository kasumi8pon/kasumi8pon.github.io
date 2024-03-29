import { Html, Head, Main, NextScript } from 'next/document';

const GA_TRACKING_ID = 'G-FFSPS63VBD'

const GoogleTagManager = () => {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
        }}
      />
    </>
  )
}

export default function Document() {
  return (
    <Html>
      <Head>
        { process.env.NODE_ENV === 'production' && <GoogleTagManager/> }
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
