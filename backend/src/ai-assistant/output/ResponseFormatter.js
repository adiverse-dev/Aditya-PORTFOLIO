const suggestionEngine = require('./SuggestionEngine');
const healthMonitor = require('../core/HealthMonitor');

class ResponseFormatter {
  /**
   * Formats the final output payload for the frontend API.
   * @param {string} rawReply - The raw text from the LLM
   * @param {ConversationState} state - The current conversation state
   * @returns {Object} The JSON contract expected by the frontend
   */
  format(rawReply, state) {
    const suggestions = suggestionEngine.generateSuggestions(state);
    
    // Determine the source based on the globally tracked health monitor state
    const currentProvider = healthMonitor.getStatus().currentProvider;
    const source = currentProvider === 'MockAIProvider' ? 'fallback' : 'gemini';

    return {
      reply: rawReply,
      suggestions: suggestions,
      currentTopic: state.currentTopic,
      conversationDepth: state.conversationDepth,
      source: source
    };
  }
}

module.exports = new ResponseFormatter();
