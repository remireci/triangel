// test.js
import Test from '../components/Test';
import Nosecondtest from '../components/Nosecondtest';
import sqlite3 from 'sqlite3';
import initializeDatabase from '../lib/connect';
import crypto from "crypto";
import { headers } from "next/headers";
// Call the initializeDatabase function

const TestPage = async () => {
  const testDone = await isTestDone();  
  if (testDone) {
    return <Nosecondtest />
  }
  return <Test />
}

const isTestDone = async () => {

  initializeDatabase();

  try {
    const myHeaders = headers();
    const host = myHeaders.get("host");
    const protocol = host.startsWith("localhost") ? "http" : "https";
      
    const response = await fetch(`${protocol}://${host}/api/get-ip`, { cache: 'no-store' });
    const userData = await response.json();
    const ipAddress = userData.ip_address;

    // Check if the IP address exists in the database        
    const secretKey = process.env.SECRET_KEY;
    const iv = process.env.IV;
    // data to be encrypted
    const plainText = ipAddress;
    // create cipher object
    const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
    // encrypt the data
    let encryptedText = cipher.update(plainText, "utf-8", "hex");
    // finalize the encryption
    encryptedText += cipher.final("hex");

    const db = new sqlite3.Database('users.db');

    // Query to check if the encrypted IP exists in the users table
    const query = `SELECT COUNT(*) AS count FROM users WHERE ip_address = ?`;
    // Convert db.get into a promise-based function
    const getFromDB = () => {
      return new Promise((resolve, reject) => {
        db.get(query, [encryptedText], (err, row) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            const exists = row.count > 0;
            resolve(exists);
          }
          // Close the database connection after the query is executed
          db.close();
        });
      });
    };

    // Await the result from the promise-based function
    const existsInDB = await getFromDB();
    return existsInDB;

  } catch (error) {
    console.error('Error fetching dynamic data:', error);
    // Handle errors    
    return null; // or display an error message
  }
};

export default TestPage;