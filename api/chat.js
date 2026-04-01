import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // FIXED THIS LINE: It must match the NAME you gave it in Vercel Settings
  const apiKey = process.env.AIzaSyDfpGG1jtvh8GcIZJBRJ6qfAzIdyWs5DPY;
  
  if (!apiKey) {
    return res.status(500).json({ error: "API Key is missing in Vercel Environment Variables" });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are the official executive AI assistant of Nirdeshan Kunwar. Professionally represent Nir and his brand Mrtechnician."
    });

    const { message } = req.body;
    const result = await model.generateContent(message);
    const response = await result.response;
    
    return res.status(200).json({ reply: response.text() });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}




