import React from 'react';
// import { useRouter } from 'next/navigation';

const ConfirmationPage = () => {
  // const router = useRouter();

  // const handleReturnHome = () => {
  //   // router.push('/'); // Redirect to the home page or any other relevant page
  // };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Confirmation</h1>
      <p className="text-center mb-4">
        Your email address has been sent to our job coach. The job coach will contact you soon.
      </p>
      {/* <button
        // onClick={handleReturnHome}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Return Home
      </button> */}
    </div>
  );
};

export default ConfirmationPage;
