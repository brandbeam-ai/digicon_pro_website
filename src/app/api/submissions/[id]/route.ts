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
    
    // 1. Try local filesystem first
    const sanitizedId = id.replace(/[^a-zA-Z0-9-]/g, '');
    const filePath = path.join(process.cwd(), 'data', 'submissions', `${sanitizedId}.json`);
    
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      return NextResponse.json({ success: true, data, source: 'local' });
    } catch (fileError: any) {
      if (fileError.code !== 'ENOENT') {
        throw fileError;
      }
      
      // 2. Fallback to Airtable
      const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
      const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
      const TABLE_ID = 'tblP52B81ccH8jICa';

      if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        return NextResponse.json({ error: 'Submission not found locally and Airtable credentials missing' }, { status: 404 });
      }

      const searchUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_ID}?filterByFormula=%7Bsubmission_id%7D%3D%27${id}%27`;
      
      const searchResponse = await fetch(searchUrl, {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      });

      if (!searchResponse.ok) {
        return NextResponse.json({ error: 'Submission not found locally and Airtable search failed' }, { status: 404 });
      }

      const searchData = await searchResponse.json();
      const record = searchData.records?.[0];

      if (record && record.fields.submision_json) {
        try {
          const data = JSON.parse(record.fields.submision_json);
          return NextResponse.json({ success: true, data, source: 'airtable' });
        } catch (e) {
          return NextResponse.json({ error: 'Found record in Airtable but JSON is invalid' }, { status: 500 });
        }
      }

      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error retrieving submission:', error);
    return NextResponse.json({ error: 'Failed to retrieve submission' }, { status: 500 });
  }
}
