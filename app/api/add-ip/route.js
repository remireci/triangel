import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const ipAddress = searchParams.get('ip');
    const mail = searchParams.get('mail');

    try {
        if (!ipAddress & !mail) {
            throw new Error('Ip or mail are required');
        }

        const existingIp = await sql`
      SELECT * FROM Ips WHERE Ip = ${ipAddress};
    `;
        console.log("this is", existingIp.rows);
        if (existingIp.rows.length > 0) {
            return NextResponse.json({ message: 'IP address already exists' }, { status: 400 });
        } else {
            await sql`
        INSERT INTO Ips (Ip, Mail) VALUES (${ipAddress}, ${mail});
      `;
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const ips = await sql`SELECT * FROM Ips;`;
    return NextResponse.json({ ips }, { status: 200 });
}
