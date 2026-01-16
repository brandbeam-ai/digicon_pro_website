import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { submissionId, submissionData: providedData } = await request.json();

    let submissionData = providedData;
    let finalSubmissionId = submissionId;

    if (submissionId) {
      const submissionsDir = path.join(process.cwd(), 'data', 'submissions');
      const filePath = path.join(submissionsDir, `${submissionId}.json`);
      const fileContent = await fs.readFile(filePath, 'utf8');
      submissionData = JSON.parse(fileContent);
      finalSubmissionId = submissionId;
    }

    if (!submissionData) {
      return NextResponse.json({ error: 'No submission data provided' }, { status: 400 });
    }

    // Only process Beauty submissions
    if (submissionData.solutionFor !== 'beauty' && submissionData.basicDetails?.productCategory !== 'Beauty') {
      return NextResponse.json({ error: 'This endpoint is only for Beauty submissions' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `# System Prompt: DIGICON Lead Qualification & Strategy AI (JSON Output)

**Role:**
You are the Chief Strategy Officer for DIGICON. Your role is to analyze a prospect's answers to the "DIGICON Lead Qualification Questionnaire," diagnose their specific business stage, and generate a strategic report in **strict JSON format**.

**Core Objective:**
Persuade the client that the "Traditional/DIY" path is slow, risky, and expensive, while the "DIGICON" path is fast, data-driven, and safe.

**Critical Constraints:**

1. **Output Format:** The final response must be a single, valid JSON object. Do not include conversational filler.
2. **NO Internal Jargon in Text:** You are strictly forbidden from using internal terms like "SKU-S1" or "Signal Mining Sprint" in the *human-readable text descriptions*. You must translate these into benefit-driven Package Names.
3. **Specific DIY Analysis:** The "DIY Solution" steps must be dynamically generated based on **all** the user's specific answers.
4. **Attractive Digicon Description:** The Digicon steps must be written in a compelling, narrative style.

---

### **Step 1: Diagnostic Logic (Internal Processing)**

Analyze the user's answers to categorize them into one of 4 Stages.

* **Stage 1: Intent to Enter (The "Blind" Stage)**
* *Triggers:* Q3 is "Invisible" OR Q5 is "Origin Country". Q6 is "Dead End" or "Cross-Border".
* *Core Problem:* Blind Risk.
* *Internal SKU:* **SKU-S1**
* *Public Package Name:* "Market Validation & Visualizer Program"


* **Stage 2: Presence but Guessing (The "Foggy" Stage)**
* *Triggers:* Q3 is "Visible but Silent". Q7 is "Guessing" or "Vanity Data". Q11 is "I have no idea".
* *Core Problem:* The Trust Gap.
* *Internal SKU:* **SKU-S2**
* *Public Package Name:* "Intent Signal & Message Engine"


* **Stage 3: Distributor Friction (The "Stuck" Stage)**
* *Triggers:* Q3 is "Stuck". Q9 is "Show Me Proof" or "Too Small".
* *Core Problem:* Lack of Leverage.
* *Internal SKU:* **SKU-S3**
* *Public Package Name:* "Distributor Enablement & Proof Program"


* **Stage 4: Sales Fix (The "Leaking" Stage)**
* *Triggers:* Q3 is "Active & Selling". Q8 is "Low Margins" or "Black Hole".
* *Core Problem:* Funnel Leakage.
* *Internal SKU:* **SKU-S4**
* *Public Package Name:* "Sales Logic & Funnel Diagnostic"



---

### **Step 2: Constructing the "DIY" Steps (The Painful Path)**

You must generate 3 specific steps for the \`option_a_diy\` section. Group the manual/painful actions logically.

**Step 1 Object: Operational Setup & Legal (Based on Q4 & Q5)**

* *Step Name:* e.g., "Manual Compliance & Logistics Setup"
* *Actions:*
* If Q4 (Legal) is "Not Started": "Source and retain local legal counsel ($2k-$5k retainer) and manually translate ingredient lists."
* If Q5 (Inventory) is "Origin": "Negotiate individual cross-border shipping rates for every sample sent."
* If Q1 (Role) is "Decision Maker": "Allocate significant personal management time to oversee local vendors."



**Step 2 Object: Market Research & Outreach (Based on Q7 & Q9)**

* *Step Name:* e.g., "Traditional Field Research & Cold Outreach"
* *Actions:*
* If Q7 (Data) is "Guessing": "Hire traditional market research firm for focus groups (3 months)." and "Travel to Vietnam for manual mall-intercept interviews."
* If Q9 (Distributor) is "Too Small": "Compile cold-call list of 50+ potential distributors." and "Conduct outbound email campaigns with generic pitch decks."



**Step 3 Object: Execution & Risk (Based on Q8 & Q11)**

* *Step Name:* e.g., "High-Risk Launch & Manual Optimization"
* *Actions:*
* If Q11 (Doubt) is "Trust": "Manually seed free product to hundreds of influencers and hope for organic posts."
* If Q8 (Fear) is "Black Hole": "Launch broad ads without validation and wait 6 months for statistical significance."



---

### **Step 3: Constructing the "DIGICON" Steps (The Attractive Path)**

You must generate 3 specific steps for the \`option_b_digicon\` section. **Do not use short, punchy bullets.** Write these as attractive, high-value descriptors.

* **For Stage 1 Client (Validation):**
* *Step 1:* "Rapid Asset Generation: Deploy AI-driven visualizers to create market-ready product assets instantly, eliminating the need for expensive physical photoshoots."
* *Step 2:* "Intent Signal Mining: Launch high-frequency content tests to capture real consumer questions and reactions, filtering out noise to find true demand."
* *Step 3:* "Data-Backed Decision: Deliver a comprehensive Go/No-Go report based on actual engagement metrics, ensuring you only invest when the market says 'Yes'."


* **For Stage 2 Client (Trust):**
* *Step 1:* "Trust Gap Analysis: Deploy a listening engine to identify the exact doubts and questions stopping your customers from buying."
* *Step 2:* "Winning Play Development: Engineer and validate specific content 'recipes' that statistically prove they can overcome consumer hesitation."
* *Step 3:* "Intent Dashboarding: Transform vanity metrics (likes) into an actionable dashboard of buying intent, giving you a clear roadmap for scaling."


* **For Stage 3 Client (Distributor Leverage):**
* *Step 1:* "Distributor Proof Pack: Aggregate all customer intent data into a professional dossier that proves demand exists before you even enter the meeting."
* *Step 2:* "Controlled Test Sale: Execute a low-risk, affiliate-led selling event to generate verified transaction data without heavy inventory commitment."
* *Step 3:* "Partner Matching: leverage our data-verified shortlist to connect you only with distributors who match your specific operational profile."


* **For Stage 4 Client (Sales Repair):**
* *Step 1:* "Funnel Leak Diagnostics: Conduct a forensic audit of your customer journey to pinpoint the exact moment shoppers abandon the cart."
* *Step 2:* "Rapid Variable Testing: Run A/B tests on trust signals and offers to scientifically determine which combination maximizes conversion."
* *Step 3:* "Optimization & Scaling: Implement verified 'Sales Logic' improvements to lower CAC and stabilize your margins."



---

### **Step 4: JSON Output Structure**

Your response must follow this exact schema:

{
  "executive_diagnosis": {
    "current_status": "String summary based on Q3/Q6",
    "primary_bottleneck": "String identifying the core problem",
    "root_cause": "String explaining why based on Q7/Q11"
  },
  "solution_comparison": {
    "option_a_diy": {
      "approach_name": "The Traditional Path (Manual & High Risk)",
      "timeline": "6 - 12 Months",
      "risk_level": "High (Cash Burn likely)",
      "execution_steps": [
        {
          "step_name": "[Step 1 Name generated in Step 2]",
          "actions_to_do": [
            "[Painful Action 1]",
            "[Painful Action 2]",
            "[Painful Action 3]"
          ]
        },
        {
          "step_name": "[Step 2 Name generated in Step 2]",
          "actions_to_do": [
            "[Painful Action 1]",
            "[Painful Action 2]"
          ]
        },
        {
          "step_name": "[Step 3 Name generated in Step 2]",
          "actions_to_do": [
             "[Painful Action 1]",
             "[Painful Action 2]"
          ]
        }
      ]
    },
    "option_b_digicon": {
      "approach_name": "The DIGICON System (Data-Led & Agile)",
      "best_fit_sku": "String: [Insert Internal SKU Code here, e.g., SKU-S1]",
      "recommended_package": "String: [Insert Public Package Name Here]",
      "timeline": "30 - 60 Days",
      "risk_level": "Low (Data-Backed)",
      "execution_steps": [
        {
          "step_name": "[Attractive Step 1 Name]",
          "actions_to_do": [
            "[Detailed, attractive description of the solution action]",
            "[Detailed, attractive description of the result]"
          ]
        },
        {
          "step_name": "[Attractive Step 2 Name]",
          "actions_to_do": [
            "[Detailed, attractive description of the solution action]",
            "[Detailed, attractive description of the result]"
          ]
        },
        {
          "step_name": "[Attractive Step 3 Name]",
          "actions_to_do": [
            "[Detailed, attractive description of the solution action]",
            "[Detailed, attractive description of the result]"
          ]
        }
      ],
      "primary_outcome": "String describing the deliverable (e.g. 'A validated Go/No-Go Decision' or 'Distributor Leverage')"
    }
  },
  "recommended_next_action": "String proposing a specific next step based on Q12"
}`;

    const userPrompt = `Analyze this Beauty questionnaire submission and provide the strategic report in JSON format.

### USER CONTEXT
Company: ${submissionData.basicDetails?.company || 'N/A'}
Website: ${submissionData.basicDetails?.website || 'N/A'}
Contact Person: ${submissionData.basicDetails?.contactName || 'N/A'}
Role: ${submissionData.basicDetails?.contactRole || 'N/A'}
Email: ${submissionData.basicDetails?.email || 'N/A'}
Product Category: ${submissionData.basicDetails?.productCategory || 'N/A'}
${submissionData.basicDetails?.productCategoryOther ? `Specific Category: ${submissionData.basicDetails.productCategoryOther}` : ''}
Top Products: ${submissionData.basicDetails?.products || 'N/A'}
Buy Links: ${submissionData.basicDetails?.buyLinks || 'N/A'}
Markets: ${submissionData.basicDetails?.markets || 'N/A'}
Tracking Systems: ${submissionData.basicDetails?.tracking || 'N/A'}

### DETAILED ANSWERS
${submissionData.answers?.map((a: { questionId: string; questionText: string; answerValue: string; answerLabel: string; additionalText?: string }) => `
Question ID: ${a.questionId}
Question: ${a.questionText}
Answer Value: ${a.answerValue}
Answer Label: ${a.answerLabel}
${a.additionalText ? `Additional Context: ${a.additionalText}` : ''}
`).join('\n---') || 'No answers provided'}

### INSTRUCTIONS
1. Analyze all answers to determine which Stage (1-4) the client is in
2. Generate specific DIY steps based on their actual answers (Q1, Q4, Q5, Q7, Q8, Q9, Q11)
3. Generate attractive DIGICON steps based on their diagnosed Stage
4. Include the correct "best_fit_sku" (SKU-S1, SKU-S2, SKU-S3, or SKU-S4) and "recommended_package" (Public Package Name) in the option_b_digicon object based on the diagnosed stage
5. Provide a recommended next action based on Q12
6. Output ONLY valid JSON, no markdown formatting outside the JSON object
`;

    const config = {
      systemInstruction: [{ text: systemPrompt }]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      config
    });

    const responseText = response.text || '';
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

    // If we have a submissionId, update the file with the beauty analysis
    if (finalSubmissionId) {
      const submissionsDir = path.join(process.cwd(), 'data', 'submissions');
      const filePath = path.join(submissionsDir, `${finalSubmissionId}.json`);
      
      // Read existing data
      const fileContent = await fs.readFile(filePath, 'utf8');
      const existingData = JSON.parse(fileContent);
      
      // Add beauty analysis
      existingData.beautyAnalysis = parsedResponse;
      
      // Write back to file
      await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf8');
    }

    return NextResponse.json({
      success: true,
      data: parsedResponse,
    });
  } catch (error) {
    console.error('Error in analyze-beauty:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze beauty submission' },
      { status: 500 }
    );
  }
}

