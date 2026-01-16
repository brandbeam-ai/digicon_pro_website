import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { randomBytes } from 'crypto';
import { updateAirtable } from '@/app/utils/airtable';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Generate unique ID (timestamp + random string)
    const timestamp = Date.now();
    const randomStr = randomBytes(4).toString('hex');
    const uniqueId = `${timestamp}-${randomStr}`;
    
    // Add ID and timestamp to data
    const submissionData = {
      id: uniqueId,
      createdAt: new Date().toISOString(),
      ...data,
    };
    
    // Save to data/submissions directory
    const submissionsDir = path.join(process.cwd(), 'data', 'submissions');
    await fs.mkdir(submissionsDir, { recursive: true });
    
    const filePath = path.join(submissionsDir, `${uniqueId}.json`);
    await fs.writeFile(filePath, JSON.stringify(submissionData, null, 2), 'utf8');
    
    // Update Airtable
    await updateAirtable(uniqueId, submissionData);
    
    return NextResponse.json({ 
      success: true, 
      id: uniqueId,
      message: 'Submission saved successfully' 
    });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
  }
}
