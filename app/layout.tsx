import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from "./components/Footer";

const roboto = Roboto({
  weight: ['100', '300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Loopbaantest',
  description: 'Problemen op de job? Los het op!',
  keywords: 'autisme, loopbaanvragen'  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" type="image/jpg" href="/triangel-logo-250px-1-150x150.jpg" sizes="16x16"></link>
        <link rel="icon" type="image/jpg" href="/triangel-logo-250px-1-150x150.jpg" sizes="32x32"></link>
        <link rel="icon" type="image/jpg" href="/triangel-logo-250px-1.jpg" sizes="192x192"></link>
        <link rel="apple-touch-icon" type="image/jpg" href="/images/triangel-logo-250px-1.jpg"></link>
        <meta name="msapplication-TileImage" content="/images/triangel-logo-250px-1.jpg"></meta>
      </head>
      <body className={roboto.className}>
        <div className="flex flex-col bg-[#ffffff] min-h-screen">        
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
