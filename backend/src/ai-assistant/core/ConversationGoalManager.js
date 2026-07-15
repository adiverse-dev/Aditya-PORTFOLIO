class ConversationGoalManager {
  /**
   * Adjusts edge weights based on the recruiter's journey phase.
   * Phase 1: Discovery (Depth 0-1) -> Boost Projects/Skills
   * Phase 2: Technical (Depth 2-3) -> Boost Experience
   * Phase 3: Validation (Depth 4+) -> Boost Resume/GitHub/Contact
   * 
   * @param {string} neighborNode 
   * @param {number} baseWeight 
   * @param {number} conversationDepth 
   * @returns {number} Adjusted weight
   */
  applyJourneyBoost(neighborNode, baseWeight, conversationDepth) {
    let weight = baseWeight;

    if (conversationDepth <= 1) {
      if (['Projects', 'Healio', 'SiteLens', 'Skills'].includes(neighborNode)) weight += 0.2;
    } else if (conversationDepth >= 2 && conversationDepth <= 3) {
      if (['Experience', 'Skills'].includes(neighborNode)) weight += 0.2;
    } else if (conversationDepth >= 4) {
      if (['Resume', 'GitHub', 'Contact'].includes(neighborNode)) weight += 0.3;
    }

    return Math.min(weight, 1.0);
  }
}

module.exports = new ConversationGoalManager();
