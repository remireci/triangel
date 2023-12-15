"use client"
import { usePathname } from "next/navigation";

// components/Header.js
const Header = () => {
  const path = usePathname();
  let header_text = "doe de loopbaantest";
  if (path !== "/") {
    header_text = "jouw loopbaantest"
  }

  return (
    <header className="text-3xl h-36 lg:h-48 font-light tracking-widest text-slate-600 text-center bg-[#ffffff]">

      <div className="h-9 w-full bg-[#2f8bc9]">
      </div>
      <div className="flex flex-col md:flex-row h-full items-center justify-center">
        <div className="flex flex-col md:flex-row h-full items-center justify-between w-full lg:w-3/4">
          <div className="md:h-15 items-center ml-2 lg:ml-0 mb-7">            
              <img src="images/logo200.png"/>            
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center z-10">
            {/* <div className="w-0 lg:w-1/4"></div> */}
            <div className="w-full md:w1/2 pt-1">
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