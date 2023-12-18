import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

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

        if (!encryptedText) {
            throw new Error('IP address is required');
        }

        const existingIp = await sql`
            SELECT * FROM Ips WHERE Ip = ${encryptedText};
          `;

        if (existingIp.rows.length === 0) {
            console.log("length = 0")
            return NextResponse.json({ message: 'IP address does not exist' }, { status: 404 });
        } else {
            for (const ipEntry of existingIp.rows) {
                console.log("this is entry", ipEntry);
                await sql`
                  DELETE FROM Ips WHERE Ip = ${ipEntry.ip};
                `;
              }
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const ips = await sql`SELECT * FROM Ips;`;
    return NextResponse.json({ ips }, { status: 200 });
}

export async function GET(req) {

    try {
        const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
        console.log("this is the user's address", ip);

        const deleteResult = await removeIpAddress(ip);

        return NextResponse.json({ message: ip }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error(error, { status: 500 });
    }
}