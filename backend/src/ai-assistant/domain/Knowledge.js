class Knowledge {
  constructor(section, data, relevanceScore = 1.0) {
    this.section = section; // e.g. 'ABOUT', 'SKILLS', 'PROJECT_HEALIO'
    this.data = data;       // The actual JSON/Object data
    this.relevanceScore = relevanceScore; 
  }
}
module.exports = Knowledge;
