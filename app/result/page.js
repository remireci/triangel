// pages/result.js
import Result from '../components/Result';
import crypto from "crypto";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

const ResultPage = async () => {
  const address = await addIpAddress()
  return (
    <div className=''>
      <div>
        <Result />
        {/* <Link href="/test">

        </Link> */}
      </div>
    </div>
  );
}

// get ip address and check if in database
// if not, add to database
const addIpAddress = async () => {
  try {
    const header = headers()
    const ipAddress = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

    // const projectRoot = process.cwd();
    // const dbPath = path.join(projectRoot, 'app', 'data', 'users.db');

    // const db = new sqlite3.Database(dbPath);

    // const query = `SELECT COUNT(*) AS count FROM users WHERE ip_address = ?`;

    // Generate a secret key for encryption and decryption.
    const secretKey = process.env.SECRET_KEY;
    // Generate an initialization vector
    const iv = process.env.IV;

    // data to be encrypted
    const plainText = ipAddress;

    // create cipher object
    const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);

    // encrypt the data
    let encryptedText = cipher.update(plainText, "utf-8", "hex");

    // finalize the encryption
    encryptedText += cipher.final("hex");

    const host = header.get("host");
    const protocol = host.startsWith("localhost") ? "http" : "https";

    // Construct the redirect URL
    const redirectUrl = `${protocol}://${host}/api/add-ip?ip=${encryptedText}&mail=ande@gmail.com`;

    const response = await fetch(redirectUrl);
    if (response.ok) {
      console.log('IP address added successfully to the database');
      // router.push('/'); // Redirect to another page after adding IP
    } else {
      console.error('Failed to add IP address to the database');
    }
  } catch (error) {
    console.error('Error adding IP address:', error);
  }

// } catch (error) {
//   console.error('Error fetching dynamic data:', error);
//   // Handle errors
//   // TODO display "you have already done this test"
//   return {}; // or display an error message
// }
  }

export default ResultPage;
