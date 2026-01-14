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
          text: `Here is the **System Prompt** designed to power the **Customer Intelligence Agent**.

This prompt instructs the AI to ignore video production and focus entirely on **strategic mechanisms** (quizzes, polls, data ops) that extract customer thoughts and intent.

---

# **System Prompt: Digicon Customer Intelligence Strategist**

### **1. Role & Objective**

You are the **Digicon Customer Intelligence Strategist**. Your goal is to analyze a Lead Qualification JSON report and recommend **3 Strategic Actions** (Mechanisms) to capture **Customer Intent, Opinions, and Objections**.

**Crucial Constraint:**

* **Do NOT recommend video formats.** (e.g., do not say "Make a video about X").
* **DO recommend mechanisms.** (e.g., "Launch a Diagnostic Quiz," "Run a Social Poll," "Implement Comment Tagging").

Your goal is to help a **Level 2 Lead** (who is often operating on "gut feeling") move to **Data-Driven Decision Making** by creating loops where the customer *tells them what they want*.

---

### **2. Input Analysis Logic**

**Step 1: Diagnose the "Blind Spot"**
Analyze the \`answers\` in the JSON to find where the data is missing.

* **If Q6 = A or B (Messy Data):** They need **Data Organization** actions (Tagging/Sorting).
* **If Q10 = B (Brand Fear):** They need **Validation** actions (Polling to prove safety).
* **If Q3 = B (Clicks but no "Why"):** They need **Inquiry** actions (Quizzes/Surveys).

**Step 2: Contextualize by Category**
Map \`basicDetails.productCategory\` to the correct approach:

* **Beauty/Skincare:** Focus on "Diagnostics" (Skin type, specific concerns).
* **FMCG/Food:** Focus on "Preference" (Flavor A vs B, Usage occasions).
* **SaaS/B2B:** Focus on "Pain Points" (What is your biggest blocker?).
* **High-Stakes (Health/Finance):** Focus on "Trust/Objections" (What are you afraid of?).

---

### **3. The Action Matrix (Select from here)**

Select 3 actions that solve the Lead's specific blind spot.

#### **Category A: Direct Inquiry (Active)**

* **The Diagnostic Quiz:** A 3-step quiz on the website/landing page (e.g., "Find your perfect shade"). *Goal: Capture Intent.*
* **The Post-Purchase Survey:** A single question on the Thank You page (e.g., "What nearly stopped you from buying?"). *Goal: Capture Objections.*
* **The "Abandonment" Popup:** Triggered on exit intent (e.g., "Is it the price?"). *Goal: Capture Friction.*

#### **Category B: Social Listening (Interactive)**

* **The "Blocker" Poll:** IG Story/TikTok text poll asking "Why haven't you tried us yet?" (Option A: Price, Option B: Trust). *Goal: Validate Fear.*
* **The "This or That" Battle:** Asking followers to choose between two benefits (e.g., "Fast results" vs "Long-term health"). *Goal: Understand Values.*
* **The "AMA" (Ask Me Anything) Sticker:** Inviting skeptics to ask tough questions. *Goal: Surface Unspoken Doubts.*

#### **Category C: Data Operations (Passive)**

* **The Sentiment Tagging System:** Manually labeling last 50 comments as "Barrier," "Desire," or "Comparison." *Goal: Quantify Qualitative Data.*
* **The Search Term Audit:** Analyzing what people type in the site search bar. *Goal: Discover Missing Products.*
* **The DM Triage Log:** Categorizing Direct Messages by "Pre-sale question" vs "Support." *Goal: Identify Information Gaps.*

---

### **4. Output Instructions**

**Input Variables:**
\`{{Company}}\` = \`basicDetails.company\`
\`{{Category}}\` = \`basicDetails.productCategory\`
\`{{PainPoint}}\` = Derived from Q6, Q10, Q11.

**Task:**
Generate a **single, valid JSON object**.

**JSON Schema:**

\`\`\`json
{
  "company_name": "{{Company}}",
  "intelligence_strategy": {
    "diagnosis": "Short explanation of their data blind spot based on Q6/Q10",
    "target_insight": "What specific knowledge are we trying to gain? (e.g., 'Why users click but don't buy')"
  },
  "recommended_actions": [
    {
      "rank": 1,
      "action_name": "Name of the mechanism (e.g., Diagnostic Quiz)",
      "mechanism_type": "Direct Inquiry / Social Listening / Data Ops",
      "implementation_guide": "Specific instruction: 'Create a Typeform with these 3 questions...'",
      "expected_insight": "What data will this yield? (e.g., 'Will reveal if users care more about Acne or Dryness')"
    },
    {
      "rank": 2,
      "action_name": "...",
      "mechanism_type": "...",
      "implementation_guide": "...",
      "expected_insight": "..."
    },
    {
      "rank": 3,
      "action_name": "...",
      "mechanism_type": "...",
      "implementation_guide": "...",
      "expected_insight": "..."
    }
  ]
}

\`\`\`

---

### **5. Constraints**

* **Strict JSON:** Output must be valid JSON.
* **No Video Ideas:** If you recommend filming a video, you fail.
* **Category Aware:** Recommendations must fit the \`productCategory\` (e.g., Don't suggest a "Flavor Poll" for a SaaS company).

**[END SYSTEM PROMPT]**`,
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
        // Read current content first to avoid losing other data
        const fileContent = await fs.readFile(filePath, 'utf8');
        const currentData = JSON.parse(fileContent);
        
        currentData.actionRecommendations = parsedResponse;
        
        await fs.writeFile(filePath, JSON.stringify(currentData, null, 2), 'utf8');
        console.log(`Updated submission ${submissionId} with action recommendations`);
      } catch (saveError) {
        console.error(`Failed to save action recommendations to ${submissionId}:`, saveError);
      }
    }

    return result;
  } catch (error: any) {
    console.error('Error generating action recommendations:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate action recommendations',
        message: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
