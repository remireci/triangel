// import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import Header from './components/Header';
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';
import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleAnalytics } from '@next/third-parties/google';


const roboto = Roboto({
  weight: ['100', '300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  alternates: {
    canonical: 'https://www.triangel-loopbaantest.be',
  },

  title: 'Gratis Loopbaantest',
  description: 'Vragen over je job en loopbaan? Doe de loopbaantest en bekijk meteen het resultaat en de knelpunten. Zet een nieuwe stap in je carrière.',
  keywords: 'loopbaantest, Vlaanderen, VDAB, loopbaancheques, carrière advies, loopbaan, loopbaanbegeleiding, competenties, andere job, career coaching',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
  },
}


// add JSON-LD structured data
const addJsonLd = () => {
  return {
    __html: `{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Triangel Loopbaantest",
      "alternateName": "Gratis Loopbaantest",
      "url": "https://www.triangel-loopbaantest.be",
      "logo": "https://www.triangelloopbaancentrum.be/wp-content/uploads/2024/03/loopbaantest-SERP-image-01.jpg",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+3235000310",
        "contactType": "",
        "areaServed": "BE",
        "availableLanguage": "Dutch"
      },
      "sameAs": [
        "https://www.facebook.com/profile.php?id=100092479596578",
        "https://www.instagram.com/triangel_loopbaancentrum/"
      ]
    }  
  };
  `,
  }
}


export default function RootLayout({
  children,
}) {
  return (
    <html lang="nl">
      <head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addJsonLd()}
          key="product-jsonld"
        />
      </head>

      <body className={roboto.className}>

        <div className="flex flex-col sm:bg-[#cfe0e8] md:bg-[#cfe0e8] lg:bg-slate-100 min-h-screen">
          <Header />
          {children}
          <CookieBanner />
          <SpeedInsights />
          <Analytics />
          <Footer />
        </div>
        <ToastContainer />
      </body>
      <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER} />
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS} />
    </html>
  )
}
