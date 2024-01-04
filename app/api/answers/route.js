// pages/api/answers.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const answersFilePath = path.join(process.cwd(), '/app/data/answers.json');
    const answersData = JSON.parse(fs.readFileSync(answersFilePath, 'utf-8'));    
    return NextResponse.json(answersData);
  } catch (error) {
    console.error('Error reading questions file:', error);
    return NextResponse.error(error, { status: 500 });
  }
}


