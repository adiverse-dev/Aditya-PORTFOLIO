export type Project = {
  id: string
  title: string
  kind: string
  caseStudy: string
  caseStudyAi?: string
  stack: string[]
  outcome: string
  metrics: { label: string; value: string }[]
  live: string
  github: string
  featured?: boolean
  ai: boolean
  preview: 'trackify' | 'resume-ai' | 'sniper'
  videoLabel?: string
}

export const projects: Project[] = [
  {
    id: 'trackify',
    title: 'Trackify',
    kind: 'Analytics Dashboard',
    caseStudy:
      'Built a React + TypeScript dashboard with Node APIs aggregating behavior, performance, and engagement data into one decision-ready view.',
    stack: ['React', 'TypeScript', 'Recharts', 'Node.js'],
    outcome: 'Unified real-time KPIs for product & ops teams',
    metrics: [
      { label: 'Data streams', value: '3+' },
      { label: 'Chart modules', value: '12' },
      { label: 'Update cadence', value: 'Live' },
    ],
    live: '#',
    github: 'https://github.com/adiverse-dev',
    featured: true,
    ai: false,
    preview: 'trackify',
  },
  {
    id: 'resume-ai',
    title: 'Resume Intelligence',
    kind: 'AI Product',
    caseStudy:
      'Built a full-stack React app with structured parsing pipelines; AI scores resumes, extracts skills, and returns actionable feedback in seconds.',
    caseStudyAi:
      'OpenAI powers structured extraction and scoring — prompts tuned for consistent JSON output and fallback when the model drifts.',
    stack: ['React', 'OpenAI', 'TypeScript', 'Parsing'],
    outcome: 'Automated review replacing manual screening',
    metrics: [
      { label: 'Parse success', value: '91%' },
      { label: 'Avg review', value: '<8s' },
      { label: 'User rating', value: '4.8/5' },
    ],
    live: 'https://asset-manager--07omsingh.replit.app',
    github: 'https://github.com/adiverse-dev',
    ai: true,
    preview: 'resume-ai',
    videoLabel: 'AI demo flow',
  },
  {
    id: 'sniper',
    title: 'Sniper Education',
    kind: 'Growth Platform',
    caseStudy:
      'Built a conversion-focused education portal with React, semantic SEO structure, and performance budgets for mobile-first learners.',
    stack: ['React', 'Tailwind', 'SEO', 'Vite'],
    outcome: 'Live production academy site',
    metrics: [
      { label: 'SEO uplift', value: '+42%' },
      { label: 'LCP', value: '2.1s' },
      { label: 'Uptime', value: '99.9%' },
    ],
    live: 'https://sniperdefenceacademy.com',
    github: 'https://github.com/adiverse-dev',
    ai: false,
    preview: 'sniper',
  },
]

export const blogPosts = [
  {
    slug: 'llm-json-pipelines',
    date: 'Mar 2025',
    title: 'Designing LLM pipelines that return usable JSON',
    excerpt:
      'How I structure prompts, validate outputs, and add fallbacks when building AI features in production React apps.',
    tags: ['AI', 'TypeScript'],
  },
  {
    slug: 'fullstack-to-ai',
    date: 'Feb 2025',
    title: 'From full-stack CRUD to AI-native product features',
    excerpt:
      'Lessons from shipping Resume Intelligence — where AI adds value vs. where a normal form is enough.',
    tags: ['Full-Stack', 'Product'],
  },
]

export const testimonials = [
  {
    quote:
      'Delivers end-to-end — from API design to polished UI. AI features felt integrated, not bolted on.',
    role: 'Product collaborator',
  },
  {
    quote: 'Strong ownership on SEO and performance; measurable gains after launch.',
    role: 'Growth project lead',
  },
]
