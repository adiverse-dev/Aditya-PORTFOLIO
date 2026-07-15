const Topic = require('../domain/Topic');

class TopicMapper {
  /**
   * Maps an intent to a specific Topic.
   * @param {Intent} intent 
   * @returns {Topic}
   */
  mapIntentToTopic(intent) {
    switch (intent.name) {
      case 'INQUIRE_PROJECT':
        if (intent.rawEntity === 'Healio') return new Topic('PROJECT_HEALIO', 'PROJECT', 'Healio');
        if (intent.rawEntity === 'SiteLens') return new Topic('PROJECT_SITELENS', 'PROJECT', 'SiteLens');
        return new Topic('PROJECTS_ROOT', 'ROOT', 'Projects');
      
      case 'INQUIRE_SKILLS':
        return new Topic('SKILLS_ROOT', 'ROOT', 'Skills');
        
      case 'INQUIRE_EXPERIENCE':
        return new Topic('EXPERIENCE_ROOT', 'ROOT', 'Experience');

      case 'DOWNLOAD_RESUME':
        return new Topic('RESUME_ROOT', 'ROOT', 'Resume');

      case 'VIEW_GITHUB':
        return new Topic('GITHUB_ROOT', 'ROOT', 'GitHub');
        
      case 'CONTACT_ADITYA':
        return new Topic('CONTACT_ROOT', 'ROOT', 'Contact');
        
      default:
        return new Topic('GENERAL', 'ROOT', 'General Conversation');
    }
  }
}

module.exports = new TopicMapper();
