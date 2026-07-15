const contentExtractor = require('./ContentExtractor');
const knowledgeIndexer = require('./KnowledgeIndexer');
const knowledgeCache = require('./KnowledgeCache');

class KnowledgeLoader {
  async initialize() {
    try {
      console.log('[KnowledgeLoader] Bootstrapping knowledge pipeline...');
      const rawData = await contentExtractor.extractAll();
      knowledgeIndexer.index(rawData);
      console.log('[KnowledgeLoader] Pipeline initialized successfully.');
    } catch (error) {
      console.error('[KnowledgeLoader] Failed to initialize knowledge pipeline:', error);
    }
  }
  
  // Expose the cache so the rest of the application can query it
  getCache() {
    return knowledgeCache;
  }
}

module.exports = new KnowledgeLoader();
