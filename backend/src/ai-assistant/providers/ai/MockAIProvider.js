const BaseAIProvider = require('./BaseAIProvider');

class MockAIProvider extends BaseAIProvider {
  constructor() {
    super();
    this.isReady = true;
  }

  init() {
    this.isReady = true;
    return true;
  }

  async generateResponse({ message, history = [], systemInstruction }) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simple heuristic to extract the intent from the prompt or message
    const msg = message.toLowerCase();
    
    let fallbackText = "I'm receiving a high number of requests right now, but I can still help you explore Aditya's portfolio.";

    if (msg.includes('project') || msg.includes('healio') || msg.includes('sitelens')) {
      fallbackText = "I'm currently running on a fallback circuit due to high traffic, but here is what you need to know about Aditya's projects: He built Healio (a full-stack AI telehealth platform) and SiteLens (an automated SEO auditing platform). Both showcase his strong MERN stack skills.";
    } else if (msg.includes('skill') || msg.includes('tech stack')) {
      fallbackText = "I'm experiencing API limits right now, but Aditya's core stack includes React.js, Node.js, Express, PostgreSQL, and Docker. He is highly proficient in modern web development.";
    } else if (msg.includes('experience') || msg.includes('work')) {
      fallbackText = "I'm operating in fallback mode due to high load, but regarding his experience: Aditya is currently a Software Developer Intern at Finofits Consulting, where he tracks production bugs and migrates data architectures to Azure.";
    } else if (msg.includes('resume')) {
      fallbackText = "I'm currently under heavy load, but you can definitely download Aditya's resume! Just use the suggested button below.";
    } else if (msg.includes('github')) {
      fallbackText = "I'm on a backup server at the moment, but you can view all of Aditya's code at https://github.com/adiverse-dev.";
    } else if (msg.includes('contact')) {
      fallbackText = "I'm running in offline mode due to high demand! You can reach Aditya directly at adityasingh92731@gmail.com.";
    }

    return fallbackText;
  }
}

module.exports = new MockAIProvider();
