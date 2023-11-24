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
    <header className="text-3xl font-medium h-32 tracking-widest text-slate-600 text-center bg-[#daebe8]">
      <div className="h-8 md:h-15 bg-[#daebe8]"></div>
      <div className="flex flex-row">
        <div className="w-0 lg:w-1/4"></div>
        <div className="w-full md:w1/2 lg:w-1/4 pt-1">
          <a href="/">{header_text}</a>
        </div>
        <div className="w-0 lg:w-1/4"></div>
      </div>
      <div className="mt-10 h-8 bg-[#87bdd8] z-10"></div>
    </header>
  );
};

export default Header;