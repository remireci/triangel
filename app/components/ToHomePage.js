'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';


const ToHomePage = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {

        const showTimeout = setTimeout(() => {
            setShowBanner(true);
        }, 1500);

        return () => clearTimeout(showTimeout); // Clean up the timeout on unmount
    }, []);

    const handleHideBanner = () => {
        setShowBanner(false);
    };


    return (
        <div className="flex flex-row items-center">
            {showBanner && (
                <div className="banner-slide-in fixed left-0 top-1/2 transform -translate-y-1/2 flex flex-col md:flex-row bg-slate-400 mx-2 px-4 rounded-md z-50">
                    <div className='text-sm text-slate-400 py-2'>
                        <Link className="text-[#2f8bc9] hover:text-sky-400" href="/" onClick={handleHideBanner}>
                            home
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ToHomePage;