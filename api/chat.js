import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const genAI = new GoogleGenerativeAI(process.env.AIzaSyDWSU5vQ9C8F2tTXECuMk8m6_vC3QGMb7A);
  
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are the official executive AI assistant of Nirdeshan Kunwar. Professionally represent Nir and his brand Mrtechnician."
  });

  try {
    const { message } = req.body;
    const result = await model.generateContent(message);
    const response = await result.response;
    return res.status(200).json({ reply: response.text() });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
