import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { blogPosts } from '../data/projects'
import SectionHeader from '../components/SectionHeader'

export default function Blog() {
  return (
    <section id="blog" className="section-wrap">
      <div className="section-shell">
        <SectionHeader
          index="08"
          label="Notes"
          title="Writing on full-stack & AI"
          subtitle="Short notes on shipping LLM features and product engineering — more posts coming."
        />

        <div className="grid gap-[var(--phi-4)] md:grid-cols-2">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              className="panel-card panel-card--lift group flex flex-col"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-warm">{post.date}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent">
                Read note <FiArrowRight size={12} />
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
