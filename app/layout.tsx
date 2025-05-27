import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from "./components/Footer";
import GoogleAnalytics from './components/GoogleAnalytics';
import CookieBanner from './components/CookieBanner';
import { Suspense } from 'react';


const roboto = Roboto({
  weight: ['100', '300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Loopbaantest',
  description: 'Problemen op de job? Los het op!',
  keywords: 'autisme, loopbaanvragen, loopbaanbegeleiding Vlaanderen, VDAB',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const measurementId = process.env.GOOGLE_ANALYTICS;

  return (
    <html lang="nl">
      <head>
        {/* Umami tracking script*/}
        <script defer src="https://umami-loopbaantest-bitter-flower-1931.fly.dev/script.js" data-website-id="7d9c2893-798c-4079-aa37-be2ddd334e96"></script>
      </head>
      <body className={roboto.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex flex-col sm:bg-[#cfe0e8] md:bg-[#cfe0e8] lg:bg-slate-100 min-h-screen">
            <Header />
            {children}
            <CookieBanner />
            <Footer />
          </div>
          <ToastContainer />
        </Suspense>
      </body>
    </html>
  )
}