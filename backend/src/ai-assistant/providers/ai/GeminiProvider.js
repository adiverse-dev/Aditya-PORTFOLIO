const { GoogleGenAI } = require('@google/genai');
const BaseAIProvider = require('./BaseAIProvider');

class GeminiProvider extends BaseAIProvider {
  constructor() {
    super();
    this.ai = null;
    this.isReady = false;
    this.modelName = process.env.AI_MODEL || 'gemini-3.1-flash-lite';
  }

  init() {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_key_here') {
      console.warn('[GeminiProvider] No valid GEMINI_API_KEY found. Operating in mock mode.');
      return false;
    }
    
    try {
      this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      this.isReady = true;
      console.log(`[GeminiProvider] Initialized successfully with ${this.modelName}`);
      return true;
    } catch (error) {
      console.error('[GeminiProvider] Initialization failed:', error.message);
      return false;
    }
  }

  async generateResponse({ message, history = [], systemInstruction }) {
    if (!this.isReady || !this.ai) {
      throw new Error('API_KEY_MISSING');
    }

    const chatHistory = history.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const chat = this.ai.chats.create({
      model: this.modelName,
      config: {
        systemInstruction: systemInstruction,
      },
      history: chatHistory,
    });

    const maxRetries = 2;
    let attempt = 0;

    while (attempt <= maxRetries) {
      try {
        if (attempt > 0) {
          const EventBus = require('../../events/EventBus');
          const EventTypes = require('../../events/EventTypes');
          EventBus.emit(EventTypes.RETRY_STARTED, { attempt });
        }

        const result = await chat.sendMessage({ message: message.trim() });
        
        if (attempt > 0) {
          const EventBus = require('../../events/EventBus');
          const EventTypes = require('../../events/EventTypes');
          EventBus.emit(EventTypes.RETRY_COMPLETED, { attempt });
        }
        
        return result.text;
      } catch (error) {
        attempt++;
        
        const isRateLimit = error.message.includes('429') || error.message.includes('quota');
        
        if (attempt > maxRetries) {
          throw new Error(`[GeminiProvider] Generation Error: ${error.message}`);
        }
        
        let delayMs = Math.pow(2, attempt) * 1000; // Exponential backoff: 2s, 4s

        // Attempt to parse specific retryDelay from Google RPC error if present
        if (isRateLimit) {
           const match = error.message.match(/retry in ([\d\.]+)s/);
           if (match && match[1]) {
             delayMs = Math.ceil(parseFloat(match[1]) * 1000);
           } else {
             delayMs = 5000; // default 5s if rate limited but no specific time parsed
           }
        }
        
        console.warn(`[GeminiProvider] Attempt ${attempt} failed. Retrying in ${delayMs}ms... Error: ${error.message}`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }
}

module.exports = new GeminiProvider();
