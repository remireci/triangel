"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from 'next/image';

// components/Header.js
const Header = () => {
  const path = usePathname();
  let header_text = "doe de loopbaantest";
  if (path !== "/") {
    header_text = "jouw loopbaantest"
  }

  return (
    <header className="lg:fixed lg:top-0 w-full text-3xl sm:h-52 md:h-48 font-light tracking-widest text-slate-600 text-center bg-[#ffffff]">
      <div className="sm:fixed sm:top-0 md:fixed md:top-0 flex flex-row items-center justify-between h-16 w-full bg-[#2f8bc9] z-50">
        <div className="flex flex-row md:justify-start lg:justify-end items-end sm:w-1/3 ml-2 md:ml-12 md:w-1/5 h-1/2">
          <Image
            src="/images/phone_white.png"
            alt="icon"
            width={12}
            height={12}
            className="mr-2 mb-1"
          />
          <p className="text-lg sm:text-sm text-white font-bold tracking-normal lg:mr-20">03 500 03 10</p>
        </div>
        <div className="flex flex-row justify-start md:justify-center items-end md:w-1/5 lg:w-1/4 h-1/2">
          <Link
            href="https://www.triangelloopbaancentrum.be/loopbaanbegeleiding/vraag-je-gratis-kennismakingsgesprek/"
            target="_blank"
          >
            <p className="text-lg sm:text-sm text-white font-bold tracking-wide hover:text-slate-400 mr-2">GRATIS INFOGESPREK</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row sm:mt-20 md:mt-16 h-full items-center justify-center">
        <div className="flex flex-col md:flex-row h-full md:items-start justify-between w-full lg:w-3/4 md:pt-4">
          <div className="md:h-15 items-center ml-2 md:ml-10 lg:ml-0 md:mb-7">
            <Image
              src="/images/triangel-logo-250px.jpg"
              className='h-24'
              alt="icon"
              width={150}
              height={200}

            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center md:pt-6 sm:-mt-12 md:mt-8 mb-8 z-10">
            {/* <div className="w-0 lg:w-1/4"></div> */}
            <div className="w-full">
              <a href="/">{header_text}</a>
            </div>
            {/* <div className="w-0 lg:w-1/4"></div> */}
          </div>
          <div className=""></div>
        </div>
      </div>
    </header>
  );
};

export default Header;