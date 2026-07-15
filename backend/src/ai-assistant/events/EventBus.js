const EventEmitter = require('events');

class EventBus extends EventEmitter {
  constructor() {
    super();
  }

  emit(event, payload) {
    // Basic logging for now, to be expanded in analytics phase
    console.log(`[EventBus] ${event}`, payload ? JSON.stringify(payload).substring(0, 100) + '...' : '');
    return super.emit(event, payload);
  }
}

// Export a singleton instance
module.exports = new EventBus();
