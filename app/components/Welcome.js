// components/Welcome.js
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Welcome = () => {
  const [ip, setIp] = useState("");
  const [hasTestDone, setHasTestDone] = useState(false);

  useEffect(() => {
    // if (localStorage.getItem("categoryData")) {
    //     localStorage.removeItem("categoryData");
    // }
    const fetchIP = async () => {
      const response = await fetch('/api/get-ip');
      const data = await response.json();
      setIp(data);
    };
    fetchIP();
    if (ip) {
      setQuestionsFetched(true);
    }
  }, []);

  // if (ip) {
  //   console.log(ip);

  //   return (
  //     <div className="flex flex-row h-screen bg-[#cfe0e8] px-4 md:px-0 pt-28 md:pt-36 lg:pt-48">
  //       <div className='w-0 md:w-1/4 lg:w-1/4'></div>
  //       <div className='w-full md:w-1/2 lg:w-1/4 h-80 px-4 py-4 bg-[#daebe8] rounded shadow-md'>
  //         <h1 className="text-xl mb-2 text-black">
  //           Je hebt eerder reeds deelgenomen aan deze test.
  //         </h1>
  //         <p className="text-sm mb-2 text-black">
  //           Het resultaat is je per mail toegestuurd. Kijk je spam folder na als je de mail niet gevonden hebt.
  //           Contacteer ons om je resultaat met ons te bespreken. MAIL
  //         </p>
  //       </div>
  //       <div className='w-0 md:w-1/4 lg:w-1/2'></div>
  //     </div>
  //   );
  // };


  return (
    <div>
      <div className='flex flex-row justify-center lg:mt-44 bg-[#102e4d]'>
        <div className='w-0 md:w-1/5 lg:w-1/5'></div>
        <div className='flex flex-col justify-between max-w-lg md:w-3/5 lg:w-3/5 h-86 mt-4 lg:mt-6 px-6 md:px-4 py-6 text-slate-300 text-base rounded shadow'>
          <h2 className="mb-3">
            Zit je op een kruispunt in je loopbaan? Haal je niet genoeg energie meer uit je job? Wordt de stress je te veel?
            Is het tijd voor iets anders? Maar wat dan? Weet je niet goed wat je mogelijkheden zijn op de arbeidsmarkt?
          </h2>
          <h2 className="mb-3">
            Kortom, zit je met vragen over je job en je loopbaan, doe de gratis loopbaantest en je krijgt vrijblijvend loopbaanadvies.
            De test bestaat uit  15 eenvoudige  meerkeuze vragen en duurt 5 minuten.
          </h2>
          <div className='flex flex-col mt-12 items-center'>
            <Link
              href="/test"
            >
              <p className="w-30 bg-[#87bdd8] hover:bg-blue-800 text-sm text-slate-200 uppercase rounded px-4 py-2">Start Test</p>
            </Link>
            <p className='text-xs text-slate-400 italic mt-8 text-center'>Bij deelname aan de test worden sommige van
              je gegevens verwerkt. Meer info vind je <u><a href="/privacy" target="_blank">hier</a></u>.</p>
          </div>
        </div>
        <div className='w-0 md:w-1/5 lg:w-1/5'></div>

      </div>

      <div
        style={{ backgroundImage: `url(/images/slider-ondersteuning-op-meerdere-vlakken.jpg)` }}
        className="flex flex-row items-end justify-center h-[80vh] px-4 md:px-0 pt-28 md:pt-36 lg:pt-36 w-screen bg-center lg:bg-left-top bg-cover"
      >
      </div>
    </div>
  );
};

export default Welcome;