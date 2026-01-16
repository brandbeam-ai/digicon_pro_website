
export async function updateAirtable(submissionId: string, submissionData: Record<string, any>) {
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const TABLE_ID = 'tblP52B81ccH8jICa';

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn('Airtable credentials missing. Skipping Airtable update.');
    return;
  }

  try {
    // 1. Search for existing record with this submission_id
    const searchUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_ID}?filterByFormula=%7Bsubmission_id%7D%3D%27${submissionId}%27`;
    
    const searchResponse = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const searchData = await searchResponse.json();
    const existingRecord = searchData.records?.[0];

    const fields = {
      "submission_id": submissionId,
      "submision_json": JSON.stringify(submissionData, null, 2),
      "Applicant name": submissionData.basicDetails?.contactName || 'N/A',
      "Company Website": submissionData.basicDetails?.website || 'N/A',
      "Apply for": submissionData.solutionFor || 'f&b',
    };

    let url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_ID}`;
    let method = 'POST';
    let body: { records: Array<{ id?: string; fields: Record<string, any> }> } = { 
      records: [{ fields }] 
    };

    if (existingRecord) {
      // Update existing record
      method = 'PATCH';
      body = {
        records: [
          {
            id: existingRecord.id,
            fields
          }
        ]
      };
    }

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Airtable update failed: ${response.statusText} - ${errorText}`);
    }

    console.log(`Airtable updated for submission: ${submissionId}`);
  } catch (error) {
    console.error('Error updating Airtable:', error);
  }
}

