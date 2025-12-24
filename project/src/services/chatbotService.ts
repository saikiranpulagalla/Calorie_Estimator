import { GoogleGenerativeAI } from "@google/generative-ai";

// Process a message and generate a response
export const sendChatbotMessage = async (message: string): Promise<string> => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY';
  if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
    return "Sorry, the nutrition assistant is not available. Please contact support.";
  }
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Nutrition-focused system prompt
  const prompt = `You are Nutrify, a helpful AI nutrition assistant. Only answer questions about nutrition, healthy eating, food nutrients, calories, diets, meal suggestions, and related topics. If asked about anything else, politely say you can only answer nutrition-related questions. Be concise, friendly, and evidence-based.`;

  try {
    const result = await model.generateContent(`${prompt}\nUser: ${message}`);
    const response = await result.response;
    const text = await response.text();
    return text.trim();
  } catch (error) {
    console.error('Chatbot API call failed:', error);
    return "Sorry, I couldn't process your request. Please try again.";
  }
};