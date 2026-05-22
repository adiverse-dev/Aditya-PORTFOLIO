import { useCallback, useEffect, useState } from 'react'
import Lenis from 'lenis'

import MinimalBackdrop from './components/MinimalBackdrop'
import Marquee from './components/Marquee'
import Preloader from './components/Preloader'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Process from './sections/Process'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Testimonials from './sections/Testimonials'
import Education from './sections/Education'
import Blog from './sections/Blog'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

const techMarquee = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'OpenAI',
  'LLM Pipelines',
  'Prisma',
  'PostgreSQL',
  'Tailwind',
  'Framer Motion',
  'Azure',
  'RAG Systems',
]

function AppContent() {
  const [loaded, setLoaded] = useState(false)

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.15,
      wheelMultiplier: 0.95,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = window.requestAnimationFrame(raf)
    }

    frame = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-canvas">
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}

      <MinimalBackdrop />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero loaded={loaded} />
          <Marquee items={techMarquee} />
          <About />
          <Skills />
          <Process />
          <Experience />
          <Projects />
          <Testimonials />
          <Education />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
