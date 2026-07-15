const KnowledgeCache = require('./KnowledgeCache');

class KnowledgeIndexer {
  /**
   * Normalizes raw extracted data into unified Knowledge Nodes and stores them.
   * @param {Object} rawData - Object containing raw arrays/objects from Extractor
   */
  index(rawData) {
    if (rawData.projects) {
      KnowledgeCache.set('Projects', {
        type: 'list',
        description: 'A comprehensive list of Aditya\'s software engineering projects.',
        items: rawData.projects
      });

      // Index individual projects by their IDs so they can be deep-linked
      rawData.projects.forEach(proj => {
        KnowledgeCache.set(`Project:${proj.id}`, {
          type: 'detail',
          description: `Detailed information about the ${proj.title} project.`,
          data: proj
        });
      });
    }

    if (rawData.experiences) {
      KnowledgeCache.set('Experience', {
        type: 'list',
        description: 'Aditya\'s professional work history and roles.',
        items: rawData.experiences
      });
    }

    if (rawData.skills) {
      KnowledgeCache.set('Skills', {
        type: 'list',
        description: 'Technical skills, frameworks, and tools Aditya is proficient in.',
        items: rawData.skills
      });
    }

    // You can add logic for 'About', 'Education', 'Contact' depending on extractor

    KnowledgeCache.markLoaded();
  }
}

module.exports = new KnowledgeIndexer();
