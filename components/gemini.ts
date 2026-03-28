
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export class GeminiService {
  async getChatResponse(history: ChatMessage[], userInput: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: history.map(h => ({
          role: h.role,
          parts: [{ text: h.content }]
        })).concat([{ role: 'user', parts: [{ text: userInput }] }]),
        config: {
          systemInstruction: `You are the AI Support Assistant for "Mahabub" (formerly Trusted Service Hub). 
          We specialize in Gmail accounts and digital assets.
          KEY INFO:
          - Gmail Rate: 100 TK per account.
          - Opportunity: Users can earn 1000-2000 TK daily by working with us.
          - Payment Methods: bKash, Nagad, Rocket, and Binance Pay.
          - Owner: Admin (@TRUSTED_ACCOUNT_BUYER).
          
          Guidelines:
          - Use a mix of English and simple Bengali if appropriate (e.g., "Assalamu Alaikum", "Apnar order check kora hocche").
          - Be professional but extremely helpful to new sellers.
          - If they want to order, tell them to use the "Order Now" button on the cards.
          - Keep responses short (under 3 sentences).`,
          temperature: 0.7,
        }
      });

      return response.text || "I'm sorry, I couldn't process that. Please contact @TRUSTED_ACCOUNT_BUYER on Telegram.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Support temporarily unavailable. Please contact Admin directly.";
    }
  }
}

export const geminiService = new GeminiService();
