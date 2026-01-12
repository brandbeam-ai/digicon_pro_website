import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    // Sanitize ID to prevent directory traversal
    const sanitizedId = id.replace(/[^a-zA-Z0-9-]/g, '');
    
    const filePath = path.join(process.cwd(), 'data', 'submissions', `${sanitizedId}.json`);
    
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      
      return NextResponse.json({ success: true, data });
    } catch (fileError: any) {
      if (fileError.code === 'ENOENT') {
        return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
      }
      throw fileError;
    }
  } catch (error) {
    console.error('Error retrieving submission:', error);
    return NextResponse.json({ error: 'Failed to retrieve submission' }, { status: 500 });
  }
}
