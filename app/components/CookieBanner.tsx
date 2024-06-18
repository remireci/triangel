'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLocalStorage, setLocalStorage } from '../lib/storageHelper.ts';
// import { usePathname } from 'next/navigation';

const CookieBanner = () => {
    // const [onHomePage, setOnHomePage] = useState(false);
    const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
    const [isBannerVisible, setBannerVisible] = useState(false);
    // const currentPathname = usePathname();


    // useEffect(() => {
    //     // Check if the pathname is "/"
    //     const isHomePage = currentPathname === "/";
    //     setOnHomePage(isHomePage);

    //     const showTimeout = setTimeout(() => {
    //         setShowBanner(true);
    //     }, 500);

    //     return () => clearTimeout(showTimeout); // Clean up the timeout on unmount
    // }, []);

    // useEffect(() => {
    //     const storedCookieConsent = getLocalStorage("cookie_consent", null);

    //     if (storedCookieConsent !== null) {
    //         setCookieConsent(storedCookieConsent);
    //         setBannerVisible(false);
    //     } else {
    //         setBannerVisible(true);
    //     }
    // }, []);

    // const handleHideBanner = () => {

    //     setShowBanner(false);
    // };

    useEffect(() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null);

        if (storedCookieConsent !== null) {
            setCookieConsent(storedCookieConsent);
            setBannerVisible(false);
        } else {
            setBannerVisible(true);
        }
    }, []);

    useEffect(() => {
        if (cookieConsent !== null) {
            const newValue = cookieConsent ? 'granted' : 'denied';

            window.gtag && window.gtag("consent", 'update', {
                'analytics_storage': newValue
            });

            setLocalStorage("cookie_consent", cookieConsent);

            // Hide the banner if consent is given or denied
            setBannerVisible(false);

            // For Testing
            console.log("Cookie Consent: ", cookieConsent);
        }
    }, [cookieConsent]);

    if (!isBannerVisible) return null;


    return (
        <div className="flex flex-row items-center">
            <div className="banner-slide-in fixed bottom-0 flex flex-col md:flex-row w-full lg:w-2/5 h-10 justify-between items-center bg-gray-800 px-8 rounded-md z-50">
                <div className='text-center text-sm text-slate-400 py-6'>
                    <p>Deze site gebruikt analytische cookies voor statistieken.
                        <Link className="text-sky-800 hover:text-sky-400" rel="noopener noreferrer" target="_blank" href="/privacy#privacy"> Meer uitleg
                        </Link>
                    </p>
                </div>
                <div className='flex gap-2'>
                    <button className='px-5 py-2 text-gray-500 rounded-md border-gray-900' onClick={() => setCookieConsent(false)}>Weigeren</button>
                    <button className='bg-gray-900 px-5 py-2 text-white rounded-lg' onClick={() => setCookieConsent(true)}>Toestaan</button>
                </div>
            </div>
        </div>
    )
}

export default CookieBanner;