// test.js
// IP stored in Vercel postgres database 
import Test from '../components/Test';
import NoSecondTest from '../components/Nosecondtest';
import crypto from "crypto";
import { headers } from "next/headers";
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';


const TestPage = async () => {
  const testDone = await isTestDone();
  if (testDone) {
    return <NoSecondTest />
  }
  return <Test />
}


const isTestDone = async () => {
  try {
    const header = headers();
    const ipAddress = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

    // Check if the IP address exists in the database
    const secretKey = process.env.SECRET_KEY;
    const iv = process.env.IV;
    // Data to be encrypted
    const plainText = ipAddress;
    // Create cipher object
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    // Encrypt the data
    let encryptedText = cipher.update(plainText, 'utf-8', 'hex');
    encryptedText += cipher.final('hex');

    const result = await sql`
      SELECT * FROM Ips WHERE Ip = ${encryptedText};
    `;

    return result.rows.length > 0; // Return true if IP address exists, false otherwise
  } catch (error) {
    console.error('Error fetching dynamic data:', error);
    // Handle errors
    return false; // Return false on error or if IP check fails
  }
};

export default TestPage;