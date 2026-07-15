const { topicGraph } = require('../config/topics.graph');
const goalManager = require('../core/ConversationGoalManager');
const SUGGESTIONS = require('../config/SuggestionRegistry');

class SuggestionEngine {
  /**
   * Computes exactly 4 deterministic suggestions based on graph traversal and registry metadata.
   * @param {ConversationState} state 
   * @returns {Array<string>} Array of mapped suggestion labels for the frontend
   */
  generateSuggestions(state) {
    let currentNode = 'Greeting';
    if (state.currentTopic) {
      if (state.currentTopic.includes('Healio')) currentNode = 'Healio';
      else if (state.currentTopic.includes('SiteLens')) currentNode = 'SiteLens';
      else if (state.currentTopic.includes('Sniper')) currentNode = 'Sniper';
      else if (state.currentTopic.includes('Projects')) currentNode = 'Projects';
      else if (state.currentTopic.includes('Skills')) currentNode = 'Skills';
      else if (state.currentTopic.includes('Experience')) currentNode = 'Experience';
      else if (state.currentTopic.includes('Resume')) currentNode = 'Resume';
      else if (state.currentTopic.includes('GitHub')) currentNode = 'GitHub';
      else if (state.currentTopic.includes('Contact')) currentNode = 'Contact';
      else if (state.currentTopic.includes('General')) currentNode = 'Greeting';
    }

    const visited = Array.from(state.visitedTopics || new Set());
    const depth = state.conversationDepth || 0;
    const neighbors = topicGraph[currentNode] || {};

    const scoredSuggestions = [];

    for (const sug of SUGGESTIONS) {
      let score = sug.priority;

      // 1. Visited Penalty
      const isVisited = visited.some(v => v.includes(sug.topic));
      if (isVisited) score -= 900;

      // 2. Current Topic Penalty
      if (sug.topic === currentNode || (state.currentTopic && state.currentTopic.includes(sug.topic))) {
        score -= 900;
      }

      // 3. Deep Dive Constraint
      if (sug.category === 'deep_dive' && depth < 2) {
        score -= 50;
      }

      // 4. Graph Proximity Boost
      if (neighbors[sug.topic]) {
        score += neighbors[sug.topic] * 20 * sug.weight;
      }

      // 5. Goal Manager Journey Boost
      // applyJourneyBoost returns a value capped at 1.0, originally meant for edge weights.
      // We will pass 0.0 as base weight and multiply the resulting boost by 20.
      const journeyBoost = goalManager.applyJourneyBoost(sug.topic, 0, depth);
      score += (journeyBoost * 20);

      // Only consider if score is reasonable (not heavily penalized)
      if (score > 0) {
        scoredSuggestions.push({ suggestion: sug, score });
      }
    }

    // Sort descending by score
    scoredSuggestions.sort((a, b) => b.score - a.score);

    // Take Top 4 and map to frontend contract format (Icon + Label)
    const top4 = scoredSuggestions.slice(0, 4).map(item => {
      const s = item.suggestion;
      return s.icon ? `${s.icon} ${s.label}` : s.label;
    });

    // Fallback if registry fails to yield 4
    if (top4.length === 0) {
      return ['💻 View Projects', '📄 Download Resume', '✉️ Contact Aditya', '⭐ GitHub Profile'];
    }

    return top4;
  }
}

module.exports = new SuggestionEngine();
