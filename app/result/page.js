// pages/result.js
import Result from '../components/Result';
import sqlite3 from 'sqlite3';
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

    const db = new sqlite3.Database('users.db');

    const query = `SELECT COUNT(*) AS count FROM users WHERE ip_address = ?`;

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

    db.get(query, [encryptedText], (err, row) => {
      if (err) {
        console.error(err);
        // Handle database query error
      } else {
        const exists = row.count > 0;
        console.log("exists", exists)
        if (exists) {
          // TODO logic for 'no second test possible'
          console.log(`The hardcoded IP ${ipAddress} exists in the users table.`);
        } else {

          db.run(`INSERT INTO users (ip_address, email) VALUES (?, ?)`, [encryptedText, ""], function (err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`A row has been inserted, from result, with rowid ${this.lastID}`);
          });

        }
      }
    });
    // Close the database connection after the query is executed
    db.close();
    return {};
  } catch (error) {
    console.error('Error fetching dynamic data:', error);
    // Handle errors
    // TODO display "you have already done this test"
    return {}; // or display an error message
  }
}

export default ResultPage;
