const SUGGESTIONS = [
  // ================= EXPLORE =================
  {
    id: "explore_projects",
    label: "View Projects",
    icon: "💻",
    category: "explore",
    topic: "Projects",
    weight: 1.0,
    requiredKnowledge: null,
    priority: 90
  },
  {
    id: "explore_skills",
    label: "Explore Skills",
    icon: "⚡",
    category: "explore",
    topic: "Skills",
    weight: 1.0,
    requiredKnowledge: null,
    priority: 85
  },
  {
    id: "explore_experience",
    label: "Work Experience",
    icon: "🏢",
    category: "explore",
    topic: "Experience",
    weight: 1.0,
    requiredKnowledge: null,
    priority: 88
  },
  {
    id: "explore_journey",
    label: "Career Journey",
    icon: "🛤️",
    category: "explore",
    topic: "About",
    weight: 0.8,
    requiredKnowledge: null,
    priority: 70
  },
  
  // ================= ACTIONS =================
  {
    id: "action_resume",
    label: "Download Resume",
    icon: "📄",
    category: "action",
    topic: "Resume",
    weight: 1.5,
    requiredKnowledge: null,
    priority: 95
  },
  {
    id: "action_github",
    label: "GitHub Profile",
    icon: "⭐",
    category: "action",
    topic: "GitHub",
    weight: 1.2,
    requiredKnowledge: null,
    priority: 92
  },
  {
    id: "action_contact",
    label: "Contact Aditya",
    icon: "✉️",
    category: "action",
    topic: "Contact",
    weight: 1.5,
    requiredKnowledge: null,
    priority: 95
  },
  {
    id: "action_demo_healio",
    label: "Healio Demo",
    icon: "🏥",
    category: "action",
    topic: "Healio",
    weight: 1.0,
    requiredKnowledge: "Healio",
    priority: 80
  },
  {
    id: "action_demo_sitelens",
    label: "SiteLens Demo",
    icon: "🔍",
    category: "action",
    topic: "SiteLens",
    weight: 1.0,
    requiredKnowledge: "SiteLens",
    priority: 80
  },
  {
    id: "action_demo_sniper",
    label: "Sniper Academy",
    icon: "🎯",
    category: "action",
    topic: "Sniper",
    weight: 1.0,
    requiredKnowledge: "Sniper",
    priority: 80
  },

  // ================= DEEP DIVE =================
  {
    id: "deep_architecture",
    label: "System Architecture",
    icon: "⚙️",
    category: "deep_dive",
    topic: "Architecture",
    weight: 1.2,
    requiredKnowledge: null,
    priority: 50
  },
  {
    id: "deep_backend",
    label: "Backend Design",
    icon: "🗄️",
    category: "deep_dive",
    topic: "Backend",
    weight: 1.0,
    requiredKnowledge: null,
    priority: 55
  },
  {
    id: "deep_performance",
    label: "Performance",
    icon: "🚀",
    category: "deep_dive",
    topic: "Performance",
    weight: 1.0,
    requiredKnowledge: null,
    priority: 50
  },
  {
    id: "deep_deployment",
    label: "Deployment",
    icon: "☁️",
    category: "deep_dive",
    topic: "Deployment",
    weight: 1.0,
    requiredKnowledge: null,
    priority: 45
  },
  {
    id: "deep_security",
    label: "Security",
    icon: "🔒",
    category: "deep_dive",
    topic: "Security",
    weight: 1.0,
    requiredKnowledge: null,
    priority: 40
  },
  {
    id: "deep_ai_design",
    label: "AI Design",
    icon: "🧠",
    category: "deep_dive",
    topic: "AI",
    weight: 1.5,
    requiredKnowledge: null,
    priority: 60
  }
];

module.exports = SUGGESTIONS;
