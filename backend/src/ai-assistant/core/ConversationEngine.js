const EventBus = require('../events/EventBus');
const EventTypes = require('../events/EventTypes');
const AIProviderFactory = require('../providers/ai/AIProviderFactory');
const sessionManager = require('./SessionManager');
const intentDetector = require('../nlp/IntentDetector');
const topicMapper = require('../nlp/TopicMapper');
const knowledgeRanker = require('../providers/knowledge/KnowledgeRanker');
const promptComposer = require('../nlp/prompt/PromptComposer');
const responseFormatter = require('../output/ResponseFormatter');

class ConversationEngine {
  constructor() {
    this.aiProvider = AIProviderFactory.getProvider();
    this.isReady = this.aiProvider.init();
  }

  /**
   * Processes an incoming message and returns a standardized response object.
   */
  async processMessage({ message, history = [], clientIp = 'unknown' }) {
    EventBus.emit(EventTypes.MESSAGE_RECEIVED, { clientIp, messageLength: message.length });

    // 1. Session Hydration
    let session = sessionManager.getSession(clientIp);
    if (!session) {
      const result = sessionManager.createSession(clientIp);
      session = result.session;
      EventBus.emit(EventTypes.CONVERSATION_STARTED, { sessionId: clientIp });
    } else {
      sessionManager.touchSession(clientIp);
    }
    
    // 2. State Retrieval
    const state = sessionManager.getConversationState(clientIp);
    
    // 3. NLP Pipeline (Intent & Topic detection)
    const intent = await intentDetector.detectIntent(message);
    const targetTopic = topicMapper.mapIntentToTopic(intent);
    
    // Update state with newly detected topic
    state.currentIntent = intent.name;
    state.markTopicVisited(targetTopic.displayName);
    sessionManager.updateConversationState(clientIp, state);

    if (!this.isReady) {
      return this._formatMockResponse();
    }

    try {
      // 4. Knowledge Retrieval (Abstracted & Ranked)
      const relevantKnowledge = await knowledgeRanker.getRelevantKnowledge({
        intentName: intent.name,
        topicType: targetTopic.type,
        topicId: targetTopic.id
      });

      // 5. Prompt Assembly (Modular)
      const systemInstruction = promptComposer.compose({
        knowledgeBlocks: relevantKnowledge,
        state: state
      });

      // 6. Generation
      const replyText = await this.aiProvider.generateResponse({
        message,
        history,
        systemInstruction
      });

      EventBus.emit(EventTypes.RESPONSE_GENERATED, { clientIp, replyLength: replyText.length });
      
      // 7. Output Formatting & Suggestions
      return responseFormatter.format(replyText, state);

    } catch (error) {
      EventBus.emit(EventTypes.ERROR_OCCURRED, { clientIp, error: error.message });
      
      // The AIProviderFactory acts as a circuit breaker and should rarely throw.
      // If we reach here, it means even the MockAIProvider failed catastrophically.
      return {
        reply: "I'm receiving a high number of requests right now, but I can still help you explore Aditya's portfolio.",
        suggestions: [
          "Explore Projects",
          "View GitHub",
          "Download Resume",
          "Contact Aditya"
        ],
        currentTopic: state.currentTopic || 'Greeting',
        conversationDepth: state.conversationDepth || 0,
        source: "fallback"
      };
    }
  }

  _formatMockResponse() {
    return {
      reply: "Hi! I'm Aditya's AI assistant. The AI service is currently being configured. In the meantime, feel free to explore the portfolio or reach out to Aditya directly at adityasingh92731@gmail.com.",
      source: 'mock'
    };
  }
}

module.exports = new ConversationEngine();
