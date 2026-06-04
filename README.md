<div align="center">

# Aditya's Engineering Portfolio

**A Case Study in Frontend Engineering, Product Thinking, and Developer Growth**

[![React](https://img.shields.io/badge/React-18.0-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-black.svg?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

*An honest documentation of my growth as an early-career developer—showcasing how I learn, how I debug, and how I use AI to build better software.*

</div>

---

## 🚀 Project Metrics

- **Built with:** React + TypeScript + TailwindCSS
- **Components:** Lean, custom glassmorphic UI components (Zero bloat)
- **Layout:** Fully responsive Golden-Ratio system
- **Theming:** Semantic Dark/Light theme support
- **Architecture:** Accessibility-focused modal workspace
- **Process:** AI-assisted iterative workflow
- **Deployment:** Optimized for Vercel

---

## 1. The Goal: From Portfolio to Product

When I started building this, I didn't want it to just be a digital resume. As an early-career developer, I wanted to build something that proved I could think like a product engineer. 

This repository isn't just a list of my projects; it’s an engineering case study. It documents my journey from writing basic React components to understanding layout mathematics, accessibility, state management, and component architecture. I wanted recruiters and senior developers to see not just *what* I built, but *how* I think.

---

## 2. My AI-Assisted Workflow

I built this project inside **Antigravity IDE**, working alongside an AI engineering partner. I believe AI is a massive accelerator for learning, but **it doesn't replace the need for taste, debugging, and architectural thinking.** 

Here is what our collaboration looked like:

* **Where AI Accelerated Me:** 
  * Scaffolding the initial React/Vite boilerplate.
  * Generating complex TailwindCSS utility strings.
  * Acting as a highly specific, interactive documentation tool for Framer Motion physics.
* **Where I Had to Step In (The Human Element):**
  * **Product Decisions:** I had to tell the AI *what* to build and *why*. I defined the layout systems and rejected ideas that felt too clunky or over-engineered.
  * **Debugging:** When nested flexbox containers collapsed, or when background scroll-locking failed, the AI couldn't always see the full picture. I had to manually inspect the DOM, understand CSS specificity, and guide the AI toward the real fix.
  * **Taste & Iteration:** I spent hours tweaking paddings from `24px` to `18px`, adjusting typography scales, and removing flashy animations because I knew the UX needed to feel snappy and readable, not just visually loud.

---

## 3. Development Timeline

This project didn't emerge perfectly formed. It evolved through iterative phases:

* **Phase 1: The Simple Portfolio**
  * *What changed:* Built a basic, single-page React app with hardcoded data.
  * *What I learned:* Setting up Vite, mapping arrays in React, and basic Tailwind styling. It worked, but it felt like a beginner template.
* **Phase 2: Product-Thinking Layout**
  * *What changed:* I completely stripped the UI and started over, treating the portfolio like a SaaS dashboard. I introduced a strict design system and separated my data into a `projects.ts` file.
  * *What I learned:* The importance of separating data from UI components. Suddenly, adding a new project was as simple as writing JSON.
* **Phase 3: The Modal Workspace System**
  * *What changed:* Instead of linking out to case-study pages, I built an immersive, floating Radix UI dialog to show project details instantly.
  * *What I learned:* Headless UI. I learned how incredibly hard it is to build an accessible modal from scratch (focus trapping, screen readers, `ESC` key events) and why libraries like Radix exist.
* **Phase 4: Design System Refinement**
  * *What changed:* I implemented mathematical layouts (the 34/66 Golden Ratio split) and Bento grid cards to manage dense text.
  * *What I learned:* Visual hierarchy. I realized that smaller, denser, well-spaced UI elements look much more professional than giant, stretched-out layouts.
* **Phase 5: Performance & UX Polish**
  * *What changed:* I stripped out fake "hacker terminal" loading animations. I optimized the framer-motion variants to use hardware-accelerated transforms and ensured the modal opened with zero latency.
  * *What I learned:* Users hate waiting. Fast, smooth, predictable interactions always beat flashy, slow animations.
* **Phase 6: Codebase Audit & ATS-Optimization**
  * *What changed:* Performed a massive codebase cleanup, removing over 150 unused Shadcn UI dependencies and 50+ unused component files to achieve a highly optimized bundle. Implemented an ATS-friendly dual-mode resume system that transitions from a premium dark theme on-screen to a pristine, unstyled print version via `@media print`.
  * *What I learned:* The importance of bundle size, the dangers of over-installing UI libraries, and how to manipulate CSS for print-friendly document generation without external dependencies.

---

## 4. Before vs. After: How My Thinking Evolved

This project forced me to unlearn a lot of beginner habits. Here is how my mindset shifted:

| ❌ Beginner Mindset | ✅ Product Engineer Mindset |
|---|---|
| "More animations make the UI look premium." | "Fast, instant interactions respect the user's time." |
| "Hardcoding data directly into the component is faster." | "Abstracting data into strict TypeScript structures makes scaling effortless." |
| "If the screen is big, the UI should stretch to fill it." | "Controlled density and max-widths make reading comfortable." |
| "Just hide `overflow-y` to stop background scrolling." | "Use proper portals and `overscroll-contain` to respect native browser mechanics." |
| "If the CSS is broken, just add `!important` or fixed heights." | "Understand the flexbox hierarchy; find the parent container causing the collapse." |
| "Install an entire UI library just to use one button." | "Audit dependencies ruthlessly and only keep the code that actually ships to the user." |

---

## 5. Engineering Principles I Followed

1. **Accessibility Before Flash:** I used Radix UI for the modal because I wanted to ensure keyboard navigation and focus-trapping worked flawlessly before I even thought about adding Framer Motion springs.
2. **Controlled Density:** I intentionally constrained my reading column to `540px` and my modal to `980px`. Premium design is about intentional whitespace, not taking over the whole screen.
3. **Data/UI Separation:** The entire UI is driven by a single `projects.ts` configuration. This sets the foundation for an easy migration to a headless CMS in the future.
4. **Iterative Refinement:** I didn't try to build the perfect UI on day one. I built a messy version, audited it, shrunk the fonts, tightened the padding, and slowly carved out a clean interface.

---

## 6. Real Bugs & How I Fixed Them

The most valuable parts of this project were the moments things broke.

* 🐛 **The Scroll-Lock Leakage:** When the modal opened, aggressively scrolling on a trackpad would leak through and scroll the background website. 
  * *The Fix:* I learned about scroll hijacking. I implemented a strict Radix `Dialog.Portal` and combined it with a `useEffect` hook to lock the body, utilizing `overscroll-contain` on the modal to stop the browser's scroll chain.
* 🐛 **The Flexbox Collapse:** On smaller desktop sizes, the left-side image panel inside my modal would completely disappear.
  * *The Fix:* I was relying on `h-full` for the image, but the parent flex container only had a `max-height`, meaning it technically had no fixed height boundary to pass down. By explicitly setting `h-[72vh] min-h-[500px]` on the modal container, the flex children instantly respected their boundaries.

---

## 7. What I Would Rebuild Differently Today

I am proud of this project, but if I were starting over today, here is what I would improve:

1. **Better State Management:** Currently, I rely heavily on local React state (`useState`) to manage which project is open. If this app grew to include filtering, routing, and deep-linking (e.g., sharing a URL that opens a specific modal), I would refactor to use URL-based state or a lightweight router like React Router/Zustand.
2. **Stricter TypeScript:** While my `projects.ts` file is typed, I still have areas in my components where I could use tighter generic types and better prop interfaces to catch edge cases earlier.
3. **Reusable Animation System:** Right now, my Framer Motion variants are scattered throughout the components. I would abstract these into a centralized `animations.ts` file so I could easily reuse staggered fade-ins across the whole app.
4. **Testing Setup:** There are zero tests in this repository. In a real production environment, I would add Vitest/React Testing Library to ensure that my complex modal interactions and accessibility layers don't break when I update dependencies.

---

## 8. Architecture & Folder Structure

I aimed for a folder structure that felt simple but professional:

```text
src/
├── components/       # Reusable, stateless UI atoms (Buttons, Layout blocks)
├── sections/         # The main layout areas (Projects, Hero)
├── data/             # Abstracted database (projects.ts)
├── hooks/            # Custom logic (usePrefersReducedMotion)
├── context/          # Global state (Theme Context)
├── index.css         # Tailwind tokens and CSS variables
└── App.tsx           # Main orchestrator
```

---

## 9. Running It Locally

Want to inspect the code or break the UI? Here is how to run it:

```bash
git clone https://github.com/yourusername/portfolio-workspace.git
cd portfolio-workspace
npm install
npm run dev
```

---
---

## 10. Live Demo & Deployment

This project is fully deployed on Vercel and optimized for modern browsers.

🌐 **Live Demo:**  
https://project-a1xut.vercel.app/

### Deployment Stack
- **Hosting:** Vercel
- **Build Tool:** Vite
- **Frontend Framework:** React 18
- **Styling System:** TailwindCSS
- **Motion Engine:** Framer Motion

### Additional Details
- Custom favicon added for better branding and browser identity
- Optimized for desktop and responsive layouts
- Smooth hardware-accelerated animations
- Dark/Light theme support
## 11. A Note to Recruiters & Senior Engineers

If you’re reading this, thank you for taking the time to look through my code. 

I know I am at the beginning of my engineering career. I don't know everything yet, but I hope this repository proves my mindset. I am deeply curious, I care about how users experience software, I am not afraid of debugging hard layout problems, and I am highly coachable. 

I am looking for a team where I can contribute, learn from senior engineers, and build products that matter. If that sounds like your team, I'd love to chat.

---

## 12. Final Reflection

This project taught me that frontend engineering is not just about making things look good.

It is about:
- **systems thinking**
- **accessibility**
- **performance**
- **user psychology**
- **iteration**
- **debugging**
- **communication**

More than anything, this project changed how I think about building software.
