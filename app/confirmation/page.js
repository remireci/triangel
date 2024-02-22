import React from 'react';
import Link from 'next/link';


const ConfirmationPage = () => {

  return (
    <div className="flex flex-col items-center lg:justify-center sm:mt-12 md:mt-6 px-2 min-h-screen bg-[#cfe0e8]">
      <div className='flex flex-col w-full md:w-2/3 px-4 py-4 mx-2 justify-center items-center bg-[#daebe8]'>
        <h1 className="text-2xl font-bold mb-6">Bedankt!</h1>
        <p className="text-center mb-1 mt-8">
          Je gegevens zijn naar Triangel Loopbaancentrum verstuurd.
        </p>
        <p className="text-center mb-4">
          Een job coach zal je zo snel mogelijk contacteren.
        </p>
        <Link
          className=''
          href="https://www.triangelloopbaancentrum.be"
        >
          <p className="w-30 bg-[#87bdd8] hover:bg-blue-800 text-sm text-white rounded mt-12 px-4 py-2">
              Meer info            
            </p>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
