import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // // Create table for storing IP addresses
    // const createIpTableResult = await sql`CREATE TABLE Ips ( Ip varchar(255) );`;

    // Create table for storing email addresses
    const createEmailTableResult = await sql`CREATE TABLE Emails ( Email varchar(255) );`;

    return NextResponse.json({ createIpTableResult, createEmailTableResult }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
