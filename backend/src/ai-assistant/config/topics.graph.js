const topicGraph = {
  Greeting: {
    Projects: 0.9,
    Skills: 0.8,
    Experience: 0.7,
    About: 0.6
  },
  About: {
    Projects: 0.9,
    Experience: 0.8,
    Skills: 0.7
  },
  Projects: {
    Healio: 0.95,
    SiteLens: 0.90,
    Sniper: 0.85,
    Skills: 0.7,
    Experience: 0.6
  },
  Healio: {
    SiteLens: 0.91,
    Skills: 0.87,
    Experience: 0.76,
    Resume: 0.44
  },
  SiteLens: {
    Healio: 0.8,
    Sniper: 0.75,
    Skills: 0.9,
    Experience: 0.7
  },
  Sniper: {
    Healio: 0.8,
    SiteLens: 0.7,
    Skills: 0.6
  },
  Skills: {
    Projects: 0.9,
    Experience: 0.8,
    Resume: 0.7
  },
  Experience: {
    Projects: 0.8,
    Resume: 0.9,
    GitHub: 0.7,
    Contact: 0.6
  },
  Resume: {
    GitHub: 0.9,
    Contact: 0.8,
    Projects: 0.7,
    Experience: 0.6
  },
  GitHub: {
    Projects: 0.9,
    Resume: 0.8,
    Contact: 0.7
  },
  Contact: {
    Resume: 0.9,
    GitHub: 0.8,
    Projects: 0.6
  }
};

module.exports = { topicGraph };
