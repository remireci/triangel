import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-zinc-200 px-4 py-1 text-slate-700  shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="border rounded-md px-1 py-1">
                    <Link href="/">
                        <h1 className="text-xs font-medium hover:text-gray-400">Triangel - LOGO***</h1>                        
                    </Link>
                </div>
                <div className="mt-2 md:mt-0 flex space-x-24 md:space-x-24">
                <Link href="mailto:">
                        <p className="text-sm hover:text-gray-300">Contact</p>
                    </Link>
                    <Link href="/privacy">
                        <p className="text-sm hover:text-gray-300">Privacy Policy</p>
                    </Link>
                </div>
                <div>
                    <p className="text-center md:text-left text-sm">
                        &copy; copyright {new Date().getFullYear()} reciproque all rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
