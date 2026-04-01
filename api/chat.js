import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Setup Headers for Security/CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // 2. Check API Key
  const apiKey = process.env.AIzaSyB93hJs3t5YwPRfChyA_8XLPWiSC6z6TDQ;
  if (!apiKey) {
    return res.status(500).json({ reply: "Backend Error: GEMINI_API_KEY is missing in Vercel settings." });
  }

  try {
    const { message } = req.body;
    
    // 3. Initialize AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are the personal assistant for Nirdeshan Kunwar. Keep it short."
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ reply: text });
  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ reply: "AI Error: " + error.message });
  }
}




