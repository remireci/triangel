import React from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';

const ConfirmationPage = () => {
  // const router = useRouter();

  // const handleReturnHome = () => {
  //   // router.push('/'); // Redirect to the home page or any other relevant page
  // };

  return (
    <div className="flex flex-col items-center lg:justify-center sm:mt-20 md:mt-32 min-h-screen">
      <div className='flex flex-col bg-slate-300 px-4 py-4 mx-2 justify-center items-center'>
        <h1 className="text-2xl font-bold mb-6">Bevestiging</h1>
        <p className="text-center mb-1">
          Je e-mailadres is naar Triangel Loopbaancentrum verstuurd.
        </p>
        <p className="text-center mb-4">
          Een job coach zal je zo snel mogelijk contacteren.
        </p>
        <Link
          className=''
          href="/"
        >
          <p className="w-30 bg-[#87bdd8] hover:bg-blue-800 text-sm text-white rounded px-4 py-2">Home</p>
        </Link>

        {/* <button
        // onClick={handleReturnHome}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Return Home
      </button> */}
      </div>
    </div>
  );
};

export default ConfirmationPage;
