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
        if (existingIp.rows.length > 0) {
            // If the IP address already exists, update the existing record with the provided email
            await sql`
      UPDATE Ips SET Mail = ${mail} WHERE Ip = ${ipAddress};
    `;
            // return NextResponse.json({ message: 'Mail added to existing IP address' }, { status: 200 });
        } else {
            // If the IP address doesn't exist, insert a new record with the IP and email
            // This option should never exist!!!
            await sql`
        INSERT INTO Ips (Ip, Mail) VALUES (${ipAddress}, ${mail});
      `;
            //   return NextResponse.json({ message: 'New record with ip and mail created' }, { status: 200 });
        }
        const ips = await sql`SELECT * FROM Ips;`;
        return NextResponse.json({ ips }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
