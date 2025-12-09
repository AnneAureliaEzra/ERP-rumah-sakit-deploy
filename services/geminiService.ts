import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';

// Initialize Gemini Client
// In a real app, strict error handling for missing API key should be implemented.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateERPAnalysis = async (
  userQuery: string,
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct the chat including history for context
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
        temperature: 0.2, // Low temperature for analytical consistency
      },
      history: history,
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: userQuery,
    });

    return result.text || "Analysis generation failed. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI Analytics Service. Please verify your API Key.";
  }
};