const knowledgeCache = require('./pipeline/KnowledgeCache');
const Knowledge = require('../../domain/Knowledge');

class KnowledgeRanker {
  /**
   * Retrieves and ranks knowledge blocks from the Knowledge Cache.
   * @param {Object} params
   * @param {string} params.intentName
   * @param {string} params.topicType
   * @param {string} params.topicId
   * @returns {Promise<Knowledge[]>}
   */
  async getRelevantKnowledge({ intentName, topicType, topicId }) {
    const relevantBlocks = [];

    // Always include a baseline snippet (if we indexed 'About', but we haven't built an extractor for it yet, 
    // so we can just inject basic context for now, or just trust the system prompt)
    
    // Dynamic extraction based on topic mapping
    if (intentName === 'INQUIRE_SKILLS') {
      const data = knowledgeCache.get('Skills');
      if (data) relevantBlocks.push(new Knowledge('SKILLS', data, 1.0));
    } 
    else if (intentName === 'INQUIRE_EXPERIENCE') {
      const data = knowledgeCache.get('Experience');
      if (data) relevantBlocks.push(new Knowledge('EXPERIENCE', data, 1.0));
    }
    else if (intentName === 'INQUIRE_PROJECT') {
      if (topicId) {
        // e.g. PROJECT_HEALIO -> healio
        const rawId = topicId.replace('PROJECT_', '').toLowerCase();
        const data = knowledgeCache.get(`Project:${rawId}`);
        if (data) {
          relevantBlocks.push(new Knowledge('PROJECT_DETAIL', data, 1.0));
        } else {
          const allProjects = knowledgeCache.get('Projects');
          if (allProjects) relevantBlocks.push(new Knowledge('PROJECTS_ALL', allProjects, 0.8));
        }
      } else {
        const allProjects = knowledgeCache.get('Projects');
        if (allProjects) relevantBlocks.push(new Knowledge('PROJECTS_ALL', allProjects, 1.0));
      }
    }
    
    // Fallback: If no specific intent matched deeply, just inject everything we have loosely
    if (relevantBlocks.length === 0) {
       const allData = knowledgeCache.getAll();
       relevantBlocks.push(new Knowledge('PORTFOLIO_DUMP', allData, 0.5));
    }
    
    // Sort by relevance descending
    return relevantBlocks.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
}

module.exports = new KnowledgeRanker();
