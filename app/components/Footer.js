import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="absolute bottom-0 h-50 w-full bg-[#2e2b36] py-3 text-slate-100 font-extralight shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="text-center">
                    <h1 className="text-xs">© {new Date().getFullYear()}
                        <a href="https://www.triangelloopbaancentrum.be" target="_blank">Triangel Loopbaancentrum</a>
                        - 03 500 03 10 -
                        <a
                            href="mailto:info@triangelloopbaancentrum.be"
                            className='hover:text-gray-400'
                        >
                            info@triangelloopbaancentrum.be
                        </a>
                    </h1>
                </div>
                <div className="mt-2 md:mt-0 flex items-center space-x-12 md:space-x-12">

                    <Link href="/privacy">
                        <p className="text-xs hover:text-gray-400">Privacybeleid</p>
                    </Link>
                    <div className='flex space-x-2' >
                        <p className="text-center md:text-left text-sm">
                            <a
                                href="https://www.facebook.com/people/Triangel-Loopbaancentrum/100092479596578/"
                                target='_blank'
                                className="hover-switch-image-fb"
                            >
                                <img
                                    src="/images/107153_circle_facebook_icon.png"
                                    alt="Facebook Icon"
                                    className="w-5 h-5"
                                />
                            </a>
                        </p>
                        <p className="text-center md:text-left text-sm">
                            <a
                                href="https://www.instagram.com/triangelvzw/"
                                target='_blank'
                                className="hover-switch-image-ig"
                            >
                                <img
                                    src="/images/43-432901_instagram-grey-circle-logo-instagram-bleu.png"
                                    alt="Facebook Icon"
                                    className="w-5 h-5"
                                />
                            </a>
                        </p>
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
