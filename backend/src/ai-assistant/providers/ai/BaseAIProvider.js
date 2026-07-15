class BaseAIProvider {
  /**
   * Generates a response from the AI model.
   * @param {Object} params
   * @param {string} params.message
   * @param {Array} params.history
   * @param {string} params.systemInstruction
   * @returns {Promise<string>}
   */
  async generateResponse(params) {
    throw new Error('generateResponse must be implemented by concrete provider');
  }
}

module.exports = BaseAIProvider;
