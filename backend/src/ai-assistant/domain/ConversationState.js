class ConversationState {
  constructor() {
    this.currentTopic = 'Greeting';
    this.previousTopic = null;
    this.currentIntent = null;
    this.recruiterInterest = null;
    this.visitedTopics = new Set();
    this.remainingTopics = new Set(['Projects', 'Skills', 'Experience', 'Resume', 'GitHub', 'Contact']);
    this.conversationDepth = 0;
    this.lastSuggestions = [];
    this.currentGoal = 'Discovery';
    this.lastInteractionAt = Date.now();
  }

  markTopicVisited(topic) {
    if (!topic) return;
    this.previousTopic = this.currentTopic;
    this.currentTopic = topic;
    this.visitedTopics.add(topic);
    this.remainingTopics.delete(topic);
    this.conversationDepth += 1;
    this.lastInteractionAt = Date.now();
  }
}

module.exports = ConversationState;
