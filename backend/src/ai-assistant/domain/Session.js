class Session {
  constructor(sessionId) {
    this.sessionId = sessionId;
    this.createdAt = Date.now();
    this.expiresAt = this.createdAt + (30 * 60 * 1000); // 30 mins default
  }

  touch(ttlMs = 30 * 60 * 1000) {
    this.expiresAt = Date.now() + ttlMs;
  }

  isExpired() {
    return Date.now() > this.expiresAt;
  }
}

module.exports = Session;
