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
  keywords: 'autisme, loopbaanvragen',
  icons: {
    icon: '/icon.png',
  },  
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
