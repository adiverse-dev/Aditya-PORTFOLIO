const Intent = require('../domain/Intent');

class IntentDetector {
  /**
   * Detects intent from user message.
   * Designed to be swappable with LLM/Semantic classifiers later.
   * @param {string} message 
   * @returns {Promise<Intent>}
   */
  async detectIntent(message) {
    const text = message.toLowerCase();
    
    // Heuristic implementation (Minimum Working Module)
    if (text.includes('project') || text.includes('healio') || text.includes('sitelens')) {
      return new Intent('INQUIRE_PROJECT', 0.8, text.includes('healio') ? 'Healio' : text.includes('sitelens') ? 'SiteLens' : null);
    }
    if (text.includes('skill') || text.includes('tech stack') || text.includes('react') || text.includes('node') || text.includes('backend') || text.includes('frontend')) {
      return new Intent('INQUIRE_SKILLS', 0.8);
    }
    if (text.includes('experience') || text.includes('work') || text.includes('job') || text.includes('role')) {
      return new Intent('INQUIRE_EXPERIENCE', 0.8);
    }
    if (text.includes('resume') || text.includes('cv') || text.includes('download')) {
      return new Intent('DOWNLOAD_RESUME', 0.9);
    }
    if (text.includes('github') || text.includes('repo')) {
      return new Intent('VIEW_GITHUB', 0.9);
    }
    if (text.includes('contact') || text.includes('email') || text.includes('hire')) {
      return new Intent('CONTACT_ADITYA', 0.9);
    }

    return new Intent('GENERAL_CHAT', 0.5);
  }
}

module.exports = new IntentDetector();
