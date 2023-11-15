// pages/index.js
import Link from 'next/link';

import Welcome from './components/Welcome';


const Home = async () => {

  return (
    <div>      
      <div>
        <Welcome />
        <Link href="/test">
          <p className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">
            Start Test
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
