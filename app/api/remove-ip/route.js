import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import sqlite3 from 'sqlite3';
import crypto from "crypto";


async function removeIpAddress(ipAddress) {

    try {
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

        const db = new sqlite3.Database('users.db');

        // Query to delete the IP address
        const query = 'DELETE FROM users WHERE ip_address = ?';

        // Execute the query to delete the encrypted IP address
        db.run(query, [encryptedText], (err) => {
            if (err) {
                console.error('Error removing IP address:', err.message);
            } else {
                console.log('Successfully removed IP address:', ipAddress);
            }
            // Close the database connection
            db.close();
        });
    } catch (error) {
        console.error('Error while removing IP address:', error);
    }
}


/** @param {NextRequest} req */
export async function GET(req) {

    try {
        const headersList = headers();
        const ip = headersList.get("x-forwarded-for");

        const deleteResult = await removeIpAddress(ip);

        return NextResponse.json({ message: deleteResult }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error(error, { status: 500 });

    }
}