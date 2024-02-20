// import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import Header from './components/Header';
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from 'react';
// import { Analytics } from '@vercel/analytics/react';
import Analytics from './analytics';
import { GoogleTagManager } from '@next/third-parties/google';
// import { GoogleAnalytics } from '@next/third-parties/google';
import GoogleAnalytics from './GoogleAnalytics';

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
      <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      <head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      </head>

      <body className={roboto.className}>
        <div className="flex flex-col sm:bg-[#cfe0e8] md:bg-[#cfe0e8] lg:bg-slate-100 min-h-screen">
          <Header />
          {children}
          <SpeedInsights />
          <Suspense>
            <Analytics />
          </Suspense>
          <Footer />
        </div>
        <ToastContainer />
      </body>
      <GoogleTagManager gtmId="G-86BXTERJV5" />
      <GoogleAnalytics gaId="G-86BXTERJV5" />
    </html>
  )
}
