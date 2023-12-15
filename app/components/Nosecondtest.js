"use client"
import React from 'react';

const Nosecondtest = () => {

    return (
        <div className="flex flex-row px-4 pb-28 md:px-0 pt-28 md:pt-36 lg:pt-48">
            <div className='w-0 md:w-1/4 lg:w-1/4'></div>
            <div className="h-50 w-full md:w-1/2 lg:w-1/4 py-12 text-left bg-[#daebe8] rounded shadow-md">
                <div>
                    <p className="text-xl ml-8 mb-4">Testresultaat reeds afgeleverd!</p>
                </div>
                <div className="flex flex-col text-left justify-end mt-auto mt-12 px-8">
                    <p className="text-sm mb-1">Je kan deze test slechts eenmaal uitvoeren.</p>
                    <p className="text-sm mb-1">Het resultaat van jouw test is reeds verzonden naar het door jou opgegeven e-mailadres.</p>
                    <p className="text-sm mb-1">Testresultaat verloren? Contacteer Triangel loopbaanbegeleiding</p>
                    <p className="text-sm text-red-300 mb-1">TODO mailadres toevoegen - tekst aanpassen</p>

                    {/* <button onClick={handleCompletion} className="bg-[#87bdd8] text-white px-4 py-2 rounded shadow">
                        Ga naar het resultaat
                    </button> */}
                </div>
            </div>
            <div className='w-0 md:w-1/4 lg:w-1/2'></div>
        </div>
    );

}

export default Nosecondtest;

