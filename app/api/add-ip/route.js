import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const ipAddress = searchParams.get('ip');
    const mail = searchParams.get('mail');

    try {
        if (!ipAddress && !mail) {
            throw new Error('IP address or email is required');
        }

        if (ipAddress && mail) {
            // Insert IP address into 'Ips' table
            await sql`INSERT INTO Ips (Ip) VALUES (${ipAddress}) ON CONFLICT DO NOTHING;`;

            // Insert email into 'Emails' table
            await sql`INSERT INTO Emails (Email) VALUES (${mail}) ON CONFLICT DO NOTHING;`;

            // Return IPs and Emails
            const ips = await sql`SELECT * FROM Ips;`;
            const emails = await sql`SELECT * FROM Emails;`;
            return NextResponse.json({ ips, emails }, { status: 200 });
        } else if (ipAddress && !mail) {
            // Insert IP address into 'Ips' table
            await sql`INSERT INTO Ips (Ip) VALUES (${ipAddress}) ON CONFLICT DO NOTHING;`;

            // Return IPs
            const ips = await sql`SELECT * FROM Ips;`;
            return NextResponse.json({ ips }, { status: 200 });
        } else if (!ipAddress && mail) {
            // Insert email into 'Emails' table
            await sql`INSERT INTO Emails (Email) VALUES (${mail}) ON CONFLICT DO NOTHING;`;

            // Return Emails
            const emails = await sql`SELECT * FROM Emails;`;
            return NextResponse.json({ emails }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
