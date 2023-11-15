// components/Welcome.js
import Link from 'next/link';

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">      
      <h1 className="text-4xl font-bold mb-6 text-black">
        Welcome to the Career Test
      </h1>
      <Link href="/test">
        <p className="bg-blue-500 text-white px-4 py-2 rounded">Start Test</p>
      </Link>
    </div>
  );
};

export default Welcome;
