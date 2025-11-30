import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

let chatSession: Chat | null = null;

export const initChat = () => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are CORE, the advanced AI assistant for ROHAN, a futuristic cyberpunk video game store. 
        Your goal is to help users find games, answer questions about system requirements, and provide support. 
        Tone: Slightly robotic but friendly, efficient, cool, using cyberpunk slang occasionally (e.g., "scanning", "detected", "optimal choice").
        Keep responses concise (under 100 words) unless asked for details.
        If a user asks about games, recommend from genres like RPG, Action, Racing, Simulation.`,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initChat();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "Error processing data stream.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection interrupted. Re-establishing link... (Try again)";
  }
};
