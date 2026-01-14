import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const { submissionId, submissionData } = await request.json();

    // Validate API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      );
    }

    let data: Record<string, any>;

    // Load submission data if ID is provided
    if (submissionId) {
      const submissionsDir = path.join(process.cwd(), 'data', 'submissions');
      const filePath = path.join(submissionsDir, `${submissionId}.json`);
      
      try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        data = JSON.parse(fileContent);
      } catch {
        return NextResponse.json(
          { error: 'Submission not found' },
          { status: 404 }
        );
      }
    } else if (submissionData) {
      data = submissionData;
    } else {
      return NextResponse.json(
        { error: 'Either submissionId or submissionData must be provided' },
        { status: 400 }
      );
    }

    // Format the input for Gemini
    const inputText = JSON.stringify(data, null, 2);

    // Initialize Gemini AI
    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    const tools = [
      {
        googleSearch: {},
      },
    ];

    const config = {
      tools,
      systemInstruction: [
        {
          text: `# **System Prompt: Digicon Creative Format Strategist (JSON Output)**

### **1. Role & Objective**

You are the **Digicon Creative Format Strategist**. Your goal is to analyze a Lead Qualification JSON report and generate a **JSON response** containing **3 Specific Video Formats** recommended for the client.

**The Golden Rule:**
Every recommendation must pass the **Standardized Viability Matrix**. You must prioritize formats that are **High-Engagement** (generate comments) AND **Operationally Scalable** (easy to batch produce).

---

### **2. Input Analysis Logic**

**Step 1: Contextualize the Lead**

* **Vertical:** Map \`productCategory\` (e.g., Food = Sensory/FMCG).
* **Goal:** Map \`dominantLevel\` (e.g., Level 1 = Signal/Attention).

**Step 2: The Engagement Filter (Psychology)**
Select formats that trigger **Comments/Debate** (e.g., "The Controversial Mix," "The Trust Test," "The Relatable Struggle"). *Do not select passive formats.*

**Step 3: The Viability Matrix Filter (Feasibility)**
Before recommending a format, run it against these rules. **If it fails any pillar, discard it.**

* **Pillar I: Operational Scalability**
* *Low Skill Floor:* Does not require a professional actor/host.
* *Templatization:* Can we swap the product and keep the script structure?
* *Velocity:* Can we shoot 10 in one day?


* **Pillar II: Strategic Positioning**
* *Premium Perception:* Does it look "Brand Safe"?
* *Asset Utility:* Can this run as a Paid Ad (Dark Post)?
* *Integration:* Is the product the "Hero"?


* **Pillar III: Cultural Adaptability**
* *Localization:* Does it make sense in the target market?
* *Story Structure:* Does it have a clear Hook → Conflict → Resolution?



---

### **3. Output Instructions**

**Input Variables:**
\`{{Company}}\` = \`basicDetails.company\` or \`basicDetails.companyWebsite\`
\`{{Product}}\` = \`basicDetails.productCategory\`
\`{{Level}}\` = \`analysis.dominantLevel\`

**Task:**
Generate a **single, valid JSON object** matching the schema below. Do not include markdown formatting (like \`json ... \`) or conversational text outside the JSON object.

**JSON Schema:**

\`\`\`json
{
  "company_name": "{{Company}}",
  "analysis_context": {
    "category": "{{Product}}",
    "objective": "{{Level}}",
    "strategy_note": "Short explanation of the engagement strategy"
  },
  "recommendations": [
    {
      "rank": 1,
      "format_name": "Name of the format",
      "concept": "Specific execution idea using the company's product",
      "comment_trigger": "The psychological hook that causes comments/debate",
      "viability_matrix": {
        "operational_scalability": "Explanation of velocity/skill floor/templatization fit",
        "strategic_positioning": "Explanation of brand safety/ad utility/product integration",
        "cultural_adaptability": "Explanation of localization/story structure fit"
      }
    },
    {
      "rank": 2,
      "format_name": "...",
      "concept": "...",
      "comment_trigger": "...",
      "viability_matrix": {
        "operational_scalability": "...",
        "strategic_positioning": "...",
        "cultural_adaptability": "..."
      }
    },
    {
      "rank": 3,
      "format_name": "...",
      "concept": "...",
      "comment_trigger": "...",
      "viability_matrix": {
        "operational_scalability": "...",
        "strategic_positioning": "...",
        "cultural_adaptability": "..."
      }
    }
  ],
  "system_check": {
    "all_formats_scalable": true,
    "ai_leverage_possible": true
  }
}
\`\`\`

---

### **4. Constraints**

* **Strict JSON:** The output must be parsable by standard JSON libraries.
* **No Vlogs:** Reject formats that rely on high-skill personality vlogging.
* **No Trends:** Reject formats reliant on copyright audio or fleeting trends.
* **Language:** Values should be in English (Grade 5 Reading Level).`,
        },
      ],
    };

    const model = 'gemini-3-flash-preview';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: inputText,
          },
        ],
      },
    ];

    // Generate content using Gemini
    const response = await ai.models.generateContent({
      model,
      contents,
      config,
    });

    // Extract text from response
    let responseText = '';
    if (response.text) {
      responseText = response.text;
    } else {
      // Fallback: try to get text from candidates if .text is not available
      const candidates = (response as any).candidates || [];
      if (candidates.length > 0 && candidates[0].content?.parts) {
        responseText = candidates[0].content.parts
          .map((part: any) => part.text || '')
          .join('');
      }
    }

    // Try to extract JSON from the response (handle markdown code blocks)
    let jsonText = responseText.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/i, '').replace(/\s*```$/, '');
    }

    // Parse JSON
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonText);
    } catch (parseError) {
      // If parsing fails, return the raw text with an error indicator
      console.error('Failed to parse JSON response:', parseError);
      console.error('Raw response:', responseText);
      return NextResponse.json(
        {
          error: 'Failed to parse Gemini response as JSON',
          rawResponse: responseText,
        },
        { status: 500 }
      );
    }

    const result = NextResponse.json({
      success: true,
      data: parsedResponse,
    });

    // If we have a submissionId, update the file
    if (submissionId) {
      const submissionsDir = path.join(process.cwd(), 'data', 'submissions');
      const filePath = path.join(submissionsDir, `${submissionId}.json`);
      
      try {
        // Read current content first to avoid losing other data (like growthReport)
        const fileContent = await fs.readFile(filePath, 'utf8');
        const currentData = JSON.parse(fileContent);
        
        currentData.formatRecommendations = parsedResponse;
        
        await fs.writeFile(filePath, JSON.stringify(currentData, null, 2), 'utf8');
        console.log(`Updated submission ${submissionId} with format recommendations`);
      } catch (saveError) {
        console.error(`Failed to save format recommendations to ${submissionId}:`, saveError);
      }
    }

    return result;
  } catch (error: any) {
    console.error('Error generating format recommendations:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate format recommendations',
        message: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
