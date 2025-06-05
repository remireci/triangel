// test.js
// IP stored in Vercel postgres database 
import Test from '../components/Test';
import NoSecondTest from '../components/Nosecondtest';
import crypto from "crypto";
import { headers } from "next/headers";
import { sql } from '@vercel/postgres';
import { encryptNew } from '../lib/encryption';

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
    let ipAddress = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

    // Check if the IP address exists in the database
    const secret = process.env.SECRET_KEY;
    if (!secret) throw new Error("Missing SECRET_KEY");

    // const hashedKey = crypto.createHash("sha256").update(secret).digest();
    // const iv = crypto.randomBytes(16);

    // const cipher = crypto.createCipheriv('aes-256-cbc', hashedKey, iv);
    // // Encrypt the data
    // let encrypted = cipher.update(ipAddress, 'utf-8');
    // encrypted = Buffer.concat([encrypted, cipher.final()]);

    // const combined = `${iv.toString("hex")}:${encrypted.toString("hex")}`;


    const { encrypted, iv } = encryptNew(ipAddress, secret);
    const combined = `${iv}:${encrypted}`;

    console.log("Encrypted IP (ip_new):", combined);

    const result = await sql`
      SELECT * FROM Ips WHERE ip_new = ${combined};
    `;

    return result.rows.length > 0;

  } catch (error) {
    console.error('Error checking IP address:', error);

    return false;
  }
};

export default TestPage;