class Intent {
  constructor(name, confidence = 1.0, rawEntity = null) {
    this.name = name; // e.g., 'INQUIRE_PROJECT'
    this.confidence = confidence;
    this.rawEntity = rawEntity; // e.g., 'Healio'
  }
}
module.exports = Intent;
