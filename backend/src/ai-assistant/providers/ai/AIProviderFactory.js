const geminiProvider = require('./GeminiProvider');
const mockProvider = require('./MockAIProvider');
const EventBus = require('../../events/EventBus');
const EventTypes = require('../../events/EventTypes');

class FailoverAIProvider {
  constructor() {
    // Attempt to init both
    this.geminiReady = geminiProvider.init();
    this.mockReady = mockProvider.init();
  }

  init() {
    return this.geminiReady || this.mockReady;
  }

  async generateResponse(params) {
    if (this.geminiReady) {
      try {
        EventBus.emit(EventTypes.AI_PROVIDER_SELECTED, { providerName: 'GeminiProvider' });
        return await geminiProvider.generateResponse(params);
      } catch (error) {
        EventBus.emit(EventTypes.AI_PROVIDER_FAILED, { providerName: 'GeminiProvider', error: error.message });
        EventBus.emit(EventTypes.AI_PROVIDER_FALLBACK, { from: 'GeminiProvider', to: 'MockAIProvider' });
        // Fallthrough to mock
      }
    }

    EventBus.emit(EventTypes.AI_PROVIDER_SELECTED, { providerName: 'MockAIProvider' });
    return await mockProvider.generateResponse(params);
  }
}

class AIProviderFactory {
  /**
   * Returns a fail-safe AI provider.
   */
  static getProvider() {
    return new FailoverAIProvider();
  }
}

module.exports = AIProviderFactory;
