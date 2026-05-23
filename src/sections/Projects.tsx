import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiShield, FiX, FiArrowRight } from 'react-icons/fi'
import { type Project, projects } from '../data/projects'
import { softSpring } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import * as Dialog from '@radix-ui/react-dialog'

function ProjectPreview({ project, isModal = false }: { project: Project; isModal?: boolean }) {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-surface-muted flex flex-col ${!isModal ? 'group' : ''}`}>
      
      {/* Premium Browser Frame Mockup */}
      <div className="flex items-center gap-1.5 px-3 md:px-4 py-2.5 md:py-3 bg-surface-elevated border-b border-default shrink-0 z-10 w-full transition-colors duration-500">
        <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-red-400/80" />
        <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-amber-400/80" />
        <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-400/80" />
        <div className="ml-2 px-3 py-1 rounded bg-surface border border-default/50 text-[8px] md:text-[9px] font-medium text-muted/60 truncate max-w-[120px] transition-opacity">
          {project.live !== '#' ? project.live.replace('https://', '').replace('www.', '') : 'localhost:3000'}
        </div>
      </div>

      <div className="relative w-full flex-grow overflow-hidden bg-surface">
        <img 
          src={project.image} 
          alt={`${project.title} preview`}
          className={`w-full h-full object-cover object-top transition-transform duration-700 ease-premium ${!isModal ? 'group-hover:scale-105' : ''}`}
        />
        
        {/* Subtle overlay gradient */}
        {!isModal && (
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}

        {/* Floating Live Site Button (Center overlay on hover) */}
        {!isModal && project.live !== '#' && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-95 group-hover:scale-100 flex items-center gap-2 px-6 py-3 rounded-full bg-surface/80 backdrop-blur-xl border border-white/20 text-ink font-bold text-xs uppercase tracking-wider shadow-2xl hover:bg-surface hover:scale-105"
            aria-label={`Open live site for ${project.title}`}
          >
            View Live <FiExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  )
}

const FadeBlock = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, filter: "blur(4px)", y: 10 },
        visible: { opacity: 1, filter: "blur(0px)", y: 0 }
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Projects() {
  const reduced = usePrefersReducedMotion()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  
  useEffect(() => {
    if (expandedId) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  
    return () => {
      document.body.style.overflow = ""
    }
  }, [expandedId])

  const expandedProject = projects.find(p => p.id === expandedId)

  return (
    <section id="projects" className="section-wrap relative bg-canvas">
      <div className="section-shell">
        
        <div className="mb-16 md:mb-20 max-w-2xl">
          <span className="section-label mb-4">Selected work</span>
          <h2 className="section-heading-lg mb-6">Product case-study gallery.</h2>
          <p className="body-copy">Projects framed by the problem, the user workflow, the engineering approach, and the value created.</p>
        </div>

        {/* 1, 2, 3 Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              className="group panel-card overflow-hidden p-0 flex flex-col bg-surface border border-default rounded-2xl shadow-sm hover:shadow-xl hover:border-border-strong transition-all duration-500 h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
              transition={{ ...softSpring, delay: i * 0.1 }}
            >
              {/* Visual Preview Area */}
              <div className="relative border-b border-default w-full h-56 md:h-60 overflow-hidden shrink-0">
                <ProjectPreview project={p} />
              </div>
              
              {/* Card Content Wrapper */}
              <div className="flex flex-col flex-grow relative bg-surface z-10 p-6">
                
                {/* Category Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {p.featured && <span className="px-2.5 py-1 rounded-md bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-wider border border-gold/20">Featured</span>}
                  {p.ai && <span className="px-2.5 py-1 rounded-md bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider border border-accent/20">AI</span>}
                  <span className="px-2.5 py-1 rounded-md bg-surface-muted text-muted text-[10px] font-bold uppercase tracking-wider border border-default">{p.status}</span>
                </div>
                
                <h3 className="font-display font-bold text-ink text-2xl mb-1">{p.title}</h3>
                <p className="text-xs font-bold text-warm uppercase tracking-widest mb-3">{p.kind}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">{p.summary}</p>

                {/* Actions (Always pushed to bottom) */}
                <div className="mt-auto pt-8 flex items-center justify-between">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-default text-muted hover:text-ink hover:border-border-strong hover:bg-surface-muted transition-all"
                    aria-label={`Open GitHub repository for ${p.title}`}
                  >
                    <FiGithub size={16} />
                  </a>
                  
                  <button 
                    onClick={() => setExpandedId(p.id)}
                    className="primary-btn !min-h-[40px] !py-2 !px-5 !text-[11px] group"
                  >
                    See More <FiArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Cinematic Radix Dialog Modal */}
      <Dialog.Root open={!!expandedId} onOpenChange={(open) => !open && setExpandedId(null)}>
        <Dialog.Portal>
          <Dialog.Overlay 
            className="fixed inset-0 z-[200] bg-ink/60 backdrop-blur-xl data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in duration-200" 
            style={{ overscrollBehavior: 'none', touchAction: 'none' }}
          />
          
          <div 
            className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-8 lg:p-12 pointer-events-none"
            style={{ overscrollBehavior: 'none', touchAction: 'none' }}
          >
            <Dialog.Content 
              aria-describedby={undefined}
              data-lenis-prevent
              className="relative w-[92vw] max-w-[980px] h-[72vh] min-h-[500px] bg-surface/95 backdrop-blur-xl md:rounded-3xl shadow-2xl border border-default z-10 flex flex-col overflow-y-auto lg:overflow-hidden pointer-events-auto outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-[2%] duration-300 ease-premium"
            >
              <Dialog.Title className="sr-only">
                {expandedProject?.title}
              </Dialog.Title>

              {/* Close Button - Stays fixed relative to the modal window */}
              <div className="sticky top-0 lg:absolute lg:right-0 lg:top-0 z-50 flex justify-end w-full lg:w-auto px-4 pt-4 md:px-6 md:pt-6 pointer-events-none h-0 lg:h-auto">
                <Dialog.Close asChild>
                  <button 
                    className="pointer-events-auto flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-surface/80 backdrop-blur-md border border-default text-ink hover:bg-surface hover:text-coral hover:scale-105 transition-all shadow-md"
                    aria-label="Close case study"
                  >
                    <FiX size={24} />
                  </button>
                </Dialog.Close>
              </div>

              {expandedProject && (
                <div className="flex flex-col lg:flex-row relative w-full flex-1 min-h-0">
                  
                  {/* Refined Proportion Minor: 34% Visual Panel */}
                  <div className="w-full lg:w-[34%] h-[30vh] lg:h-full border-b lg:border-b-0 lg:border-r border-default shrink-0 relative overflow-hidden bg-surface-muted">
                    <div className="absolute inset-0 w-full h-full transform scale-[1.02]">
                      <ProjectPreview project={expandedProject} isModal={true} />
                    </div>
                    {/* Soft atmospheric gradient mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80 pointer-events-none" />
                  </div>
                  
                  {/* Refined Proportion Major: 66% Content Workspace */}
                  <div 
                    data-lenis-prevent
                    className="w-full lg:w-[66%] flex-1 min-h-0 lg:overflow-y-auto relative overscroll-contain p-5 sm:p-6 lg:p-8"
                    style={{ 
                      scrollBehavior: 'smooth', 
                      WebkitOverflowScrolling: 'touch',
                      overscrollBehavior: 'contain',
                    }}
                  >
                    <div className="flex flex-col max-w-[540px] mx-auto w-full min-h-full text-ink">
                      
                      <motion.div 
                        key="content"
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                        className="flex flex-col"
                      >
                        
                        {/* Subtle Status */}
                        <FadeBlock className="flex items-center gap-2 mb-6">
                          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-muted border border-default text-[9px] font-bold tracking-widest uppercase text-muted">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> AI ACTIVE
                          </span>
                        </FadeBlock>

                        <FadeBlock className="mb-4 flex flex-wrap gap-2">
                          {expandedProject.featured && <span className="px-2.5 py-1 rounded-md bg-gold/10 text-gold text-[9px] font-bold uppercase tracking-wider border border-gold/20">Featured</span>}
                          {expandedProject.ai && <span className="px-2.5 py-1 rounded-md bg-accent/10 text-accent text-[9px] font-bold uppercase tracking-wider border border-accent/20">AI Layer</span>}
                        </FadeBlock>
                        
                          <h3 className="font-display text-3xl lg:text-4xl font-bold text-ink leading-tight mb-1.5">
                            {expandedProject.title}
                          </h3>
                          <p className="text-[10px] font-bold text-warm uppercase tracking-widest mb-6">
                            {expandedProject.kind}
                          </p>
                          
                          <p className="text-base leading-[1.6] text-ink-soft mb-8 border-l-2 border-gold/30 pl-4">
                            {expandedProject.summary}
                          </p>
                          
                          <div className="space-y-[14px] mb-8">
                            {/* Compact SaaS Bento Cards */}
                            <FadeBlock className="p-[18px] rounded-[18px] bg-surface-muted/50 border border-default shadow-sm hover:shadow-md transition-shadow">
                              <h4 className="text-[9px] font-bold uppercase tracking-widest text-muted mb-2 flex items-center gap-2">The Problem</h4>
                              <p className="text-[13px] leading-[1.6] text-ink-soft">{expandedProject.problem}</p>
                            </FadeBlock>

                            <FadeBlock className="p-[18px] rounded-[18px] bg-surface-muted/50 border border-default shadow-sm hover:shadow-md transition-shadow">
                              <h4 className="text-[9px] font-bold uppercase tracking-widest text-muted mb-2 flex items-center gap-2">Workflow</h4>
                              <p className="text-[13px] leading-[1.6] text-ink-soft">{expandedProject.approach}</p>
                            </FadeBlock>

                            {expandedProject.caseStudyAi && (
                              <FadeBlock className="p-[18px] rounded-[18px] bg-surface-elevated border border-accent/20 shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="text-[9px] font-bold uppercase tracking-widest text-accent mb-2 flex items-center gap-2">
                                  <FiShield size={12} className="text-accent" /> AI Integration
                                </h4>
                                <p className="text-[13px] leading-[1.6] text-ink-soft">{expandedProject.caseStudyAi}</p>
                              </FadeBlock>
                            )}

                            <FadeBlock className="p-[18px] rounded-[18px] bg-surface-muted/50 border border-default shadow-sm hover:shadow-md transition-shadow">
                              <h4 className="text-[9px] font-bold uppercase tracking-widest text-muted mb-2 flex items-center gap-2">Outcomes</h4>
                              <p className="text-[13px] leading-[1.6] text-ink-soft">{expandedProject.outcome}</p>
                            </FadeBlock>
                          </div>
                          
                          <FadeBlock className="p-[18px] rounded-[18px] bg-surface-muted/50 border border-default shadow-sm">
                            <h4 className="text-[9px] font-bold uppercase tracking-widest text-muted mb-3">Key Capabilities</h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                              {expandedProject.highlights.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-[13px] text-ink-soft leading-[1.5]">
                                  <span className="text-gold mt-0.5 flex-shrink-0 text-[10px]">✦</span> 
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </FadeBlock>
                          
                          <FadeBlock className="mt-10 pt-8 border-t border-default/60 flex flex-col gap-8">
                          {/* Metrics */}
                          <div className="flex flex-wrap gap-8 lg:gap-10">
                            {expandedProject.metrics.map((m) => (
                              <div key={m.label} className="flex flex-col gap-1">
                                <span className="font-display text-xl font-bold text-ink">{m.value}</span>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-muted">{m.label}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Stack */}
                          <div className="flex flex-wrap gap-2">
                            {expandedProject.stack.map((t) => (
                              <span key={t} className="px-2.5 py-1 rounded-md bg-surface border border-default text-[9px] font-bold text-muted uppercase">
                                {t}
                              </span>
                            ))}
                          </div>
                          
                            {/* Modal Action Buttons */}
                            <div className="flex flex-wrap items-center gap-4 mt-2">
                              {expandedProject.live !== '#' && (
                                <a
                                  href={expandedProject.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="primary-btn !min-h-[44px] !py-2.5 !px-7 text-[13px] tracking-wide"
                                >
                                  View Live Site <FiExternalLink size={14} className="ml-2" />
                                </a>
                              )}
                              <a
                                href={expandedProject.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ghost-btn !min-h-[44px] !py-2.5 !px-7 text-[13px] tracking-wide"
                              >
                                <FiGithub size={14} className="mr-2" /> View Source
                              </a>
                            </div>
                          </FadeBlock>
                          
                          {/* Bottom Breathing Space / Safe Area */}
                          <div className="h-12 lg:h-16 w-full flex-shrink-0" aria-hidden="true" />
                          
                        </motion.div>
                    </div>
                  </div>
                </div>
              )}
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  )
}
