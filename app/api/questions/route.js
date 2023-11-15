// pages/api/questions.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const questionsFilePath = path.join(process.cwd(), '/app/data/questions.json');
    const questionsData = JSON.parse(fs.readFileSync(questionsFilePath, 'utf-8'));
    return NextResponse.json(questionsData);
  } catch (error) {
    console.error('Error reading questions file:', error);
    return NextResponse.error(error, { status: 500 });
  }
}


