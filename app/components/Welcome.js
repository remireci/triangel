// components/Welcome.js
import Link from 'next/link';

const Welcome = () => {
  return (
    <div className="flex flex-row h-screen bg-[#cfe0e8] px-4 md:px-0 pt-28 md:pt-36 lg:pt-48">
      <div className='w-0 md:w-1/4 lg:w-1/4'></div>
      <div className='w-full md:w-1/2 lg:w-1/4 h-80 px-4 py-4 flex flex-col justify-between bg-[#daebe8] rounded shadow-md'>
        <h1 className="text-xl font-bold mb-6 text-black">
          What is Lorem Ipsum?
        </h1>
        <p className="text-sm mb-6 text-black">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`&aposs standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <Link
          href="/test"
          className='flex flex-col items-center'
        >
          <p className="w-30 bg-[#87bdd8] hover:bg-blue-800 text-sm text-white rounded mt-8 px-4 py-2">Start Test</p>
        </Link>
      </div>
      <div className='w-0 md:w-1/4 lg:w-1/2'></div>
    </div>
  );
};

export default Welcome;
