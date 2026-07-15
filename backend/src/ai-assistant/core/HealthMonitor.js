const EventBus = require('../events/EventBus');
const EventTypes = require('../events/EventTypes');

class HealthMonitor {
  constructor() {
    this.status = {
      currentProvider: 'none',
      isHealthy: true,
      lastFailureTime: null,
      totalFailures: 0,
      consecutiveFailures: 0,
      totalRetries: 0
    };

    this._bindEvents();
  }

  _bindEvents() {
    EventBus.on(EventTypes.AI_PROVIDER_SELECTED, ({ providerName }) => {
      this.status.currentProvider = providerName;
      if (providerName === 'GeminiProvider') {
        this.status.isHealthy = true;
        this.status.consecutiveFailures = 0;
      }
    });

    EventBus.on(EventTypes.AI_PROVIDER_FAILED, ({ providerName, error }) => {
      this.status.isHealthy = false;
      this.status.lastFailureTime = Date.now();
      this.status.totalFailures++;
      this.status.consecutiveFailures++;
      console.warn(`[HealthMonitor] Provider ${providerName} failed. Consecutive failures: ${this.status.consecutiveFailures}`);
    });

    EventBus.on(EventTypes.AI_PROVIDER_FALLBACK, ({ from, to }) => {
      this.status.currentProvider = to;
      console.warn(`[HealthMonitor] Fallback triggered: ${from} -> ${to}`);
    });

    EventBus.on(EventTypes.RETRY_STARTED, ({ attempt }) => {
      this.status.totalRetries++;
      console.warn(`[HealthMonitor] Retry attempt ${attempt} started.`);
    });
  }

  getStatus() {
    return { ...this.status };
  }
}

module.exports = new HealthMonitor();
