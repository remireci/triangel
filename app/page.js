// pages/index.js
import Link from 'next/link';
import Welcome from './components/Welcome';


const Home = async () => {

  return (
    <div className=''>      
      <div>
        <Welcome />
        {/* <Link href="/test">

        </Link> */}
      </div>
    </div>
  );
};

export default Home;
