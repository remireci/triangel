import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { encryptNew } from '@/app/lib/encryption';

export async function POST(request) {
    const { ip, email } = await request.json();

    const secret = process.env.SECRET_KEY;
    if (!secret) {
        return Response.json({ error: "Missing ENCRYPTION_SECRET" }, { status: 500 });
    }
    const { encrypted, iv } = encryptNew(email, secret);
    const encryptedEmail = `${iv}:${encrypted}`;

    try {
        if (!ip && !encryptedEmail) {
            throw new Error('IP address or email is required');
        }

        if (ip && encryptedEmail) {

            console.log(`THIS IS THE ENCRYPTED EMAIL ${encryptedEmail}; and the ENCRYPTED IP ${ip} `)
            // Insert IP address into 'Ips' table
            await sql`INSERT INTO Ips (ip_new) VALUES (${ip}) ON CONFLICT DO NOTHING;`;

            // Insert email into 'Emails' table
            await sql`INSERT INTO Emails (new_email) VALUES (${encryptedEmail}) ON CONFLICT DO NOTHING;`;

            // Return IPs and Emails
            const ips = await sql`SELECT * FROM Ips;`;
            const emails = await sql`SELECT * FROM Emails;`;
            return NextResponse.json({ ips, emails }, { status: 200 });
        } else if (ip && !encryptedEmail) {
            // Insert IP address into 'Ips' table
            await sql`INSERT INTO Ips (ip_new) VALUES (${ip}) ON CONFLICT DO NOTHING;`;

            // Return IPs
            const ips = await sql`SELECT * FROM Ips;`;
            return NextResponse.json({ ips }, { status: 200 });
        } else if (!ip && encryptedEmail) {

            console.log("THIS IS THE ENCRYPTED EMAIL", encryptedEmail)
            // Insert email into 'Emails' table
            await sql`INSERT INTO Emails (new_email) VALUES (${encryptedEmail}) ON CONFLICT DO NOTHING;`;

            // Return Emails
            const emails = await sql`SELECT * FROM Emails;`;
            return NextResponse.json({ emails }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
