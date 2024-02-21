// import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import Header from './components/Header';
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { GoogleTagManager } from '@next/third-parties/google';
// import { GoogleAnalytics } from '@next/third-parties/google';
// import GoogleAnalytics from './GoogleAnalytics';

const roboto = Roboto({
  weight: ['100', '300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Loopbaantest',
  description: 'Gratis loopbaantest. Bekijk online meteen je resultaat. Problemen op de job? Los het op!',
  keywords: 'autisme, loopbaanvragen',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="nl">
      {/* <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} /> */}
      <head>
        {/* <!-- Google Tag Manager --> */}
        <script>{(function (w, d, s, l, i) {
          w[l] = w[l] || []; w[l].push({
            'gtm.start':
              new Date().getTime(), event: 'gtm.js'
          }); var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
              'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-PRLDR4CL')};</script>
        {/* <!-- End Google Tag Manager --> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      </head>

      <body className={roboto.className}>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PRLDR4CL"
          height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
        <div className="flex flex-col sm:bg-[#cfe0e8] md:bg-[#cfe0e8] lg:bg-slate-100 min-h-screen">
          <Header />
          {children}
          <SpeedInsights />
          <Footer />
        </div>
        <ToastContainer />
      </body>
      {/* <GoogleTagManager gtmId="G-86BXTERJV5" />
      <GoogleAnalytics gaId="G-86BXTERJV5" /> */}
    </html>
  )
}
