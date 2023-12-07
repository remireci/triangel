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

  if (ip) {
    console.log(ip);

    return (
      <div className="flex flex-row h-screen bg-[#cfe0e8] px-4 md:px-0 pt-28 md:pt-36 lg:pt-48">
        <div className='w-0 md:w-1/4 lg:w-1/4'></div>
        <div className='w-full md:w-1/2 lg:w-1/4 h-80 px-4 py-4 bg-[#daebe8] rounded shadow-md'>
          <h1 className="text-xl mb-2 text-black">
            Je hebt eerder al deelgenomen aan deze test.
          </h1>
          <p className="text-sm mb-2 text-black">
            Het resultaat is je per mail toegestuurd. Kijk je spam folder na als je de mail niet gevonden hebt.
            Contacteer ons als om je resultaat met ons te bespreken.
          </p>
        </div>
        <div className='w-0 md:w-1/4 lg:w-1/2'></div>
      </div>
    );
  };


  return (
    <div className="flex flex-row h-screen bg-[#cfe0e8] px-4 md:px-0 pt-28 md:pt-36 lg:pt-48">
      <div className='w-0 md:w-1/4 lg:w-1/4'></div>
      <div className='w-full md:w-1/2 lg:w-1/4 h-80 px-4 py-4 bg-[#daebe8] rounded shadow-md'>
        <h1 className="text-xl mb-2 text-black">
          What is Lorem Ipsum?
        </h1>
        <p className="text-sm mb-2 text-black">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <div className='flex flex-col mt-12 items-center'>
          <Link
            href="/test"
          >
            <p className="w-30 bg-[#87bdd8] hover:bg-blue-800 text-sm text-white rounded px-4 py-2">Start Test</p>
          </Link>
        </div>
      </div>
      <div className='w-0 md:w-1/4 lg:w-1/2'></div>
    </div>
  );
};

export default Welcome;