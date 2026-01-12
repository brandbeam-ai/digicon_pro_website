import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { pageName, translations } = data;

    if (!pageName) {
      return NextResponse.json({ error: 'Page name is required' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', 'translations', `${pageName}-ko.json`);
    
    // Ensure the directory exists
    const dirPath = path.dirname(filePath);
    await fs.mkdir(dirPath, { recursive: true });

    // Write the file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json({ success: true, message: `Translations saved to ${pageName}-ko.json` });
  } catch (error) {
    console.error('Error saving translations:', error);
    return NextResponse.json({ error: 'Failed to save translations' }, { status: 500 });
  }
}

