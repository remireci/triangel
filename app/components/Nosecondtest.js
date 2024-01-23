"use client"
import React from 'react';
import Image from 'next/image';

const Nosecondtest = () => {

    return (
        <div className='flex flex-row pb-36 lg:mt-48 text-slate-600'>
            <div className='w-0 md:w-1/4 lg:w-1/5'></div>
            <div className='flex flex-col justify-between w-full md:w-1/2 lg:w-2/5 h-86 mx-4 -mb-10 mt-20 px-6 py-6 text-base bg-[#daebe8] rounded shadow'>
                <div className="flex flex-col items-left sm:pt-4 mt-auto">
                    <p className="text-xl ml-8 mb-14">Testresultaat reeds afgeleverd!</p>
                </div>
                <div className="flex flex-col text-left justify-end mt-auto mt-12 px-8">
                    <p className="text-sm mb-1">Je kan deze test slechts eenmaal uitvoeren.</p>
                    <p className="text-sm mb-1">Als je het formulier hebt ingevuld is het resultaat van jouw test verzonden naar Triangel Loopbaancentrum.</p>
                    <p className="text-sm mb-1">Testresultaat verloren? Contacteer Triangel loopbaanbegeleiding.</p>
                </div>
                <div className="flex flex-col text-left justify-end items-center mt-auto mt-12 px-8">
                    <div className="flex flex-row h-1/2 mt-14 w-30 bg-[#2f8bc9] px-4 py-4 rounded-md">
                        <Image
                            src="/images/phone_white.png"
                            alt="icon"
                            width={12}
                            height={12}
                            className="mr-2 mb-1"
                        />
                        <p className="text-lg sm:text-sm text-white tracking-normal">03 500 03 10</p>
                    </div>
                    <div className="flex flex-row h-1/2 mt-4 bg-[#2f8bc9] px-4 sm:px-2 py-4 rounded-md">
                        <p>
                            <a
                                href="mailto:info@triangelloopbaancentrum.be"
                                className='text-white sm:text-sm hover:text-gray-400'
                            >
                                info@triangelloopbaancentrum.be
                            </a>

                        </p>
                    </div>


                    {/* <button onClick={handleCompletion} className="bg-[#87bdd8] text-white px-4 py-2 rounded shadow">
                        Ga naar het resultaat
                    </button> */}
                </div>
            </div>
            <div className='w-0 md:w-1/4 lg:w-2/5'></div>
        </div>
    );

}

export default Nosecondtest;

