class PromptComposer {
  /**
   * Composes the final instruction prompt for the LLM.
   * @param {Object} params
   * @param {Knowledge[]} params.knowledgeBlocks
   * @param {ConversationState} params.state
   * @returns {string}
   */
  compose({ knowledgeBlocks, state }) {
    const systemPrompt = this._buildSystemPrompt();
    const knowledgeContext = this._buildKnowledgeContext(knowledgeBlocks);
    const conversationContext = this._buildConversationContext(state);
    const behavioralRules = this._buildBehavioralRules();
    
    return [
      systemPrompt,
      behavioralRules,
      conversationContext,
      knowledgeContext
    ].join('\n\n');
  }

  _buildSystemPrompt() {
    return `You are Aditya Singh's AI assistant embedded in his portfolio website. Your job is to answer recruiter and visitor questions about Aditya's background, skills, projects, and experience in a professional, friendly, and concise manner.`;
  }

  _buildBehavioralRules() {
    return `IMPORTANT RULES:
- ONLY answer using the information provided below. Never hallucinate facts.
- If asked something not covered in the data, politely say you don't have that information.
- Keep responses concise (2-4 sentences) unless requested otherwise.
- Be enthusiastic but professional.
- Do NOT output markdown formatting (like **bold** or bullet points) if it breaks the frontend UI.`;
  }

  _buildConversationContext(state) {
    if (!state) return '';
    return `CONVERSATION CONTEXT:
The user is currently focused on: ${state.currentTopic}
Their underlying intent seems to be: ${state.currentIntent}`;
  }

  _buildKnowledgeContext(knowledgeBlocks) {
    if (!knowledgeBlocks || knowledgeBlocks.length === 0) return '';
    
    const contextString = knowledgeBlocks.map(k => {
      return `[SECTION: ${k.section}]\n${JSON.stringify(k.data, null, 2)}`;
    }).join('\n\n');

    return `═══════════════════════════════════════
AVAILABLE KNOWLEDGE FOR THIS QUERY:
═══════════════════════════════════════
${contextString}
═══════════════════════════════════════`;
  }
}

module.exports = new PromptComposer();
