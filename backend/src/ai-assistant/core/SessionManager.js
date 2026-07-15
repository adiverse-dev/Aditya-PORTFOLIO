const Session = require('../domain/Session');
const ConversationState = require('../domain/ConversationState');

class SessionManager {
  constructor() {
    // In-memory store (Replaceable with Redis)
    this.sessions = new Map();
    this.states = new Map();

    // Clean up expired sessions periodically
    setInterval(() => this._cleanup(), 5 * 60 * 1000); // Every 5 mins
  }

  createSession(sessionId) {
    const session = new Session(sessionId);
    const state = new ConversationState();
    
    this.sessions.set(sessionId, session);
    this.states.set(sessionId, state);
    
    return { session, state };
  }

  getSession(sessionId) {
    const session = this.sessions.get(sessionId);
    if (session && !session.isExpired()) {
      return session;
    }
    // Auto-expire if fetched after TTL
    if (session && session.isExpired()) {
      this.expireSession(sessionId);
    }
    return null;
  }

  getConversationState(sessionId) {
    return this.states.get(sessionId) || null;
  }

  updateConversationState(sessionId, newState) {
    if (this.states.has(sessionId)) {
      this.states.set(sessionId, newState);
      this.touchSession(sessionId);
    }
  }

  touchSession(sessionId) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.touch();
      this.sessions.set(sessionId, session);
    }
  }

  expireSession(sessionId) {
    this.sessions.delete(sessionId);
    this.states.delete(sessionId);
  }

  // --- Stubs for Future Architectures ---

  /**
   * Prepares support for Conversation Snapshots.
   * Summarizes long histories periodically.
   */
  async createConversationSnapshot(sessionId) {
    // TODO: To be implemented in later phase
    console.log(`[SessionManager] Snapshot created for ${sessionId}`);
  }

  _cleanup() {
    const now = Date.now();
    for (const [id, session] of this.sessions.entries()) {
      if (session.isExpired()) {
        this.expireSession(id);
      }
    }
  }
}

module.exports = new SessionManager();
