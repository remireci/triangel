import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="absolute bottom-0 h-50 w-full bg-[#2e2b36] px-1 py-3 text-slate-100 font-extralight shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="text-center">
                    <p className="text-xs">© {new Date().getFullYear()}
                        <a
                            href="https://www.triangelloopbaancentrum.be"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='ml-2'
                        >
                            Triangel Loopbaancentrum
                        </a>
                        <span className='ml-1'>
                        - 03 500 03 10 -
                        </span>
                        
                        <a
                            href="mailto:info@triangelloopbaancentrum.be"
                            className='ml-1 hover:text-gray-400'
                        >
                            info@triangelloopbaancentrum.be
                        </a>
                    </p>
                </div>
                <div className="mt-2 md:mt-0 flex items-center space-x-12 md:space-x-12">

                    <Link href="/privacy">
                        <p className="text-xs hover:text-gray-400">Privacybeleid</p>
                    </Link>
                    <div className='flex space-x-2' >
                        <p className="text-center md:text-left text-xl">
                            <a
                                href="https://www.facebook.com/people/Triangel-Loopbaancentrum/100092479596578/"
                                target='_blank'
                                rel="noopener noreferrer"
                                className="hover-switch-image-fb"
                            >
                                <Image
                                    src="/images/107153_circle_facebook_icon.png"
                                    alt="Facebook Icon"
                                    width={25}
                                    height={25}
                                    
                                />
                            </a>
                        </p>
                        <p className="text-center md:text-left text-xl">
                            <a
                                href="https://www.instagram.com/triangelvzw/"
                                target='_blank'
                                rel="noopener noreferrer"
                                className="hover-switch-image-ig"
                            >
                                <Image
                                    src="/images/43-432901_instagram-grey-circle-logo-instagram-bleu.png"
                                    alt="Facebook Icon"
                                    width={25}
                                    height={25}
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
