"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Nosecondtest = () => {

    return (
        <div className='flex flex-row pb-36 lg:mt-48 text-slate-600'>
            <div className='w-0 lg-custom:w-1/5 lg:w-1/4'></div>
            <div className='flex flex-col items-center justify-between w-full lg-custom:w-3/5 lg:w-1/2 h-86 mx-4 -mb-10 mt-8 md:px-6 py-6 text-base bg-[#daebe8] rounded shadow'>
                <div className="flex flex-col sm:pt-4 mt-auto">
                    <p className="text-xl mb-14">Testresultaat reeds afgeleverd!</p>
                </div>
                <div className="flex flex-col text-left justify-end mt-auto mt-12 px-8">
                    <p className="text-sm mb-1">Je kan deze test slechts eenmaal uitvoeren.</p>
                    <p className="text-sm mb-1">Als je het formulier hebt ingevuld is het resultaat van jouw test verzonden naar Triangel Loopbaancentrum.</p>
                    <p className="text-sm mb-1">Testresultaat verloren? Contacteer Triangel loopbaanbegeleiding.</p>
                </div>
                <div className="flex flex-col md:flex-row w-full items-center justify-between text-slate-200 mt-4 px-20">
                    <div className="flex flex-row w-32 justify-center mt-4 bg-[#2f8bc9] hover:bg-blue-800 px-2 py-1 rounded-md cursor-pointer">
                        <Link
                            href="https://www.triangelloopbaancentrum.be"
                            className='sm:text-sm'
                        >
                            meer info
                        </Link>
                    </div>
                    <div className="flex flex-row w-32 justify-center mt-4 bg-[#2f8bc9] hover:bg-blue-800 px-2 py-1 rounded-md cursor-pointer">
                        <Link
                            href="mailto:info@triangelloopbaancentrum.be"
                            className='sm:text-sm'
                        >
                            mail

                        </Link>
                    </div>
                    <div className="flex flex-row w-32 justify-center mt-4 bg-[#2f8bc9] px-2 py-1 rounded-md">
                        <Image
                            src="/images/phone_white.png"
                            alt="icon"
                            width={12}
                            height={12}
                            className="mr-2 mb-1"
                        />
                        <p className="text-lg sm:text-sm text-white tracking-normal">03 500 03 10</p>
                    </div>
                </div>
            </div>
            <div className='w-0 lg-custom:w-1/5 lg:w-1/4'></div>
        </div>
    );
}

export default Nosecondtest;

