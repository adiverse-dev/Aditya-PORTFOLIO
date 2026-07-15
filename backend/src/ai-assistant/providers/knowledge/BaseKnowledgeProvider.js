class BaseKnowledgeProvider {
  /**
   * Fetches raw knowledge data from the source.
   * @returns {Promise<Object>}
   */
  async fetchAllKnowledge() {
    throw new Error('fetchAllKnowledge must be implemented by concrete provider');
  }
}
module.exports = BaseKnowledgeProvider;
