export type Project = {
  id: string
  title: string
  kind: string
  problem: string
  users: string
  summary: string
  highlights: string[]
  caseStudy: string
  approach: string
  caseStudyAi?: string
  stack: string[]
  outcome: string
  status: string
  deployment: string
  metrics: { label: string; value: string }[]
  live: string
  github: string
  featured?: boolean
  ai: boolean
  preview: 'healio' | 'propai' | 'sniper'
  image: string
  videoLabel?: string
}

export const projects: Project[] = [
  {
    id: 'healio',
    title: 'Healio',
    kind: 'AI Healthcare Workflow Platform',
    problem:
      'Healthcare users often struggle to translate symptoms and health concerns into the right next step, while clinics need clearer routing across patients, doctors, and admins.',
    users: 'For patients, doctors, and healthcare operators who need a smarter path from health issue intake to care recommendation.',
    summary:
      'A multi-role healthcare workflow concept that turns symptom intake into structured care-routing signals.',
    highlights: ['Patient, doctor, and admin dashboards', 'AI-assisted issue analysis', 'Doctor recommendation workflow'],
    caseStudy:
      'Designed Healio as an intelligent healthcare SaaS ecosystem where users can describe health concerns, AI helps analyze the issue, and the system recommends relevant doctors through a multi-role dashboard architecture.',
    approach:
      'Structured the product around role-based workflows: patient intake, AI-assisted issue sorting, doctor discovery, and admin-level visibility for managing the healthcare platform.',
    caseStudyAi:
      'AI supports symptom and issue analysis, helping convert unstructured health text into clearer routing signals for doctor recommendation workflows.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'AI Workflows'],
    outcome: 'AI-assisted healthcare routing across patient, doctor, and admin dashboards',
    status: 'Case-study build',
    deployment: 'Code available; public demo is being prepared',
    metrics: [
      { label: 'Role dashboards', value: '3' },
      { label: 'AI workflow', value: 'Triage' },
      { label: 'Product model', value: 'SaaS' },
    ],
    live: '#',
    github: 'https://github.com/adiverse-dev/healio',
    featured: true,
    ai: true,
    preview: 'healio',
    image: '/images/projects/healio.png',
  },
  {
    id: 'propai',
    title: 'propAI',
    kind: 'AI Prop-Tech SaaS Ecosystem',
    problem:
      'Rental operations are fragmented across listings, tenants, owners, payments, agreements, maintenance, and support workflows, making property management difficult to scale.',
    users: 'For property operators, owners, and tenants managing rentals, PGs, apartments, staycations, payments, and service workflows.',
    summary:
      'A rental operations SaaS preview covering listings, roles, rent flows, agreements, and maintenance workflows.',
    highlights: ['Owner, tenant, and admin views', '12+ rental workflow surfaces', 'AI-assisted operations guidance'],
    caseStudy:
      'Built propAI as a multi-dashboard property operations platform with admin, tenant, and owner views for listings, onboarding, rent tracking, agreements, maintenance requests, and revenue visibility.',
    approach:
      'Modeled the system around real rental lifecycle stages: onboarding inventory, managing occupancy, collecting rent, tracking deposits, handling complaints, and supporting move-in/move-out workflows.',
    caseStudyAi:
      'AI assists with property sorting, operational recommendations, dashboard guidance, and smarter workflow assistance across management tasks.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'AI Systems'],
    outcome: 'Scalable rental operations platform with intelligent workflow assistance',
    status: 'Live preview',
    deployment: 'Hosted on Netlify',
    metrics: [
      { label: 'Role dashboards', value: '3' },
      { label: 'Rental workflows', value: '12+' },
      { label: 'AI layer', value: 'Smart ops' },
    ],
    live: 'https://hivelvy.netlify.app/',
    github: 'https://github.com/adiverse-dev/propAI',
    ai: true,
    preview: 'propai',
    image: '/images/projects/propai.png',
  },
  {
    id: 'sniper',
    title: 'Sniper Defence Academy',
    kind: 'Production Education Platform',
    problem:
      'Defence training academies need a web presence that can communicate trust, course clarity, student outcomes, and inquiry paths across mobile-first audiences.',
    users: 'For defence aspirants and academy teams that need a branded, conversion-focused education experience.',
    summary:
      'A live education platform built to communicate trust, course clarity, and mobile-first inquiry paths.',
    highlights: ['Responsive production website', 'Course and trust storytelling', 'SEO-aware Vite frontend'],
    caseStudy:
      'Built a production-ready educational web platform with modern frontend structure, responsive presentation, branded course storytelling, and clear paths for students exploring defence exam preparation.',
    approach:
      'Structured the experience around trust and discovery: academy positioning, course visibility, results, facilities, and direct contact moments for prospective students.',
    stack: ['React', 'Tailwind', 'SEO', 'Vite'],
    outcome: 'Modern branded web ecosystem for a live education business',
    status: 'Production site',
    deployment: 'Public website',
    metrics: [
      { label: 'Live platform', value: 'Live' },
      { label: 'Experience', value: 'Responsive' },
      { label: 'Focus', value: 'Growth' },
    ],
    live: 'https://www.sniperdefenceacademy.com/en',
    github: 'https://github.com/adiverse-dev',
    ai: false,
    preview: 'sniper',
    image: '/images/projects/sniper.png',
  },
]

export const blogPosts = [
  {
    slug: 'llm-json-pipelines',
    date: 'Mar 2025',
    title: 'Designing LLM pipelines that return usable JSON',
    excerpt:
      'How I structure prompts, validate outputs, and add fallbacks when building AI features inside production web apps.',
    tags: ['AI', 'TypeScript'],
  },
  {
    slug: 'fullstack-to-ai',
    date: 'Feb 2025',
    title: 'From MERN products to AI-native workflows',
    excerpt:
      'Notes on deciding when AI improves a product workflow, and when a clean form, API, or dashboard is the better solution.',
    tags: ['MERN', 'Product'],
  },
]

export const testimonials = [
  {
    quote:
      'Delivers end-to-end - from API design to polished UI. AI features felt integrated, not bolted on.',
    role: 'Product collaborator',
  },
  {
    quote: 'Strong ownership on SEO, performance, and product flow; measurable gains after launch.',
    role: 'Growth project lead',
  },
]
