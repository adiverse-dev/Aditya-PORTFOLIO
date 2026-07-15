module.exports = {
  CONVERSATION_STARTED: 'CONVERSATION_STARTED',
  MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
  RESPONSE_GENERATED: 'RESPONSE_GENERATED',
  ERROR_OCCURRED: 'ERROR_OCCURRED',

  // Phase 7: Failover & Resilience Events
  AI_PROVIDER_SELECTED: 'ai_provider_selected',
  AI_PROVIDER_FAILED: 'ai_provider_failed',
  AI_PROVIDER_FALLBACK: 'ai_provider_fallback',
  RETRY_STARTED: 'retry_started',
  RETRY_COMPLETED: 'retry_completed'
};
