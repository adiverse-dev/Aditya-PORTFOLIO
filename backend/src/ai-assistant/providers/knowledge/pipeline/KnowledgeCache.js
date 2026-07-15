class KnowledgeCache {
  constructor() {
    this.index = new Map();
    this.isLoaded = false;
    this.lastUpdatedAt = null;
  }

  set(topic, data) {
    this.index.set(topic.toLowerCase(), data);
  }

  get(topic) {
    return this.index.get(topic.toLowerCase()) || null;
  }

  getAll() {
    const all = {};
    for (const [key, val] of this.index.entries()) {
      all[key] = val;
    }
    return all;
  }

  markLoaded() {
    this.isLoaded = true;
    this.lastUpdatedAt = new Date();
    console.log(`[KnowledgeCache] Successfully cached ${this.index.size} topics at ${this.lastUpdatedAt.toISOString()}`);
  }
}

module.exports = new KnowledgeCache();
