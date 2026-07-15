import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ────────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────────── */
type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

/* ────────────────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────────────────── */
export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [ttsEnabled, setTtsEnabled] = useState(true)
  const [avatarPulse, setAvatarPulse] = useState(false)
  
  // Dynamic suggestions fetched from backend
  const [suggestions, setSuggestions] = useState<string[]>([
    "Tell me about his projects",
    "What is his tech stack?",
    "Tell me about his experience",
    "Who is Aditya?"
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null)

  /* Auto-scroll to latest message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  /* Focus input when chat opens */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  /* Cleanup speech on unmount */
  useEffect(() => {
    return () => {
      synthRef.current?.cancel()
    }
  }, [])

  /* ── Speech synthesis ────────────────────────────────── */
  const speak = useCallback(
    (text: string) => {
      if (!ttsEnabled || !synthRef.current) return

      synthRef.current.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 0.85

      // Try to find a natural-sounding voice
      const voices = synthRef.current.getVoices()
      const preferred = voices.find(
        (v) =>
          v.name.includes('Google') ||
          v.name.includes('Natural') ||
          v.name.includes('David') ||
          v.name.includes('Zira')
      )
      if (preferred) utterance.voice = preferred

      utterance.onstart = () => {
        setIsSpeaking(true)
        setAvatarPulse(true)
      }
      utterance.onend = () => {
        setIsSpeaking(false)
        setAvatarPulse(false)
      }
      utterance.onerror = () => {
        setIsSpeaking(false)
        setAvatarPulse(false)
      }

      synthRef.current.speak(utterance)
    },
    [ttsEnabled]
  )

  /* ── Send message ────────────────────────────────────── */
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text.trim(),
      }

      setMessages((prev) => [...prev, userMsg])
      setInput('')
      setIsLoading(true)

      try {
        const history = messages.map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          content: m.content,
        }))

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text.trim(), history }),
        })

        const data = await res.json()

        const reply = data.reply || data.error || 'Sorry, something went wrong.'
        
        // Update dynamic suggestions if backend provided them
        if (data.suggestions && Array.isArray(data.suggestions)) {
          setSuggestions(data.suggestions)
        }

        const assistantMsg: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: reply,
        }

        setMessages((prev) => [...prev, assistantMsg])
        speak(reply)
      } catch {
        const errorMsg: Message = {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content:
            "I'm having trouble connecting right now. Please try again in a moment or contact Aditya directly at adityasingh92731@gmail.com.",
        }
        setMessages((prev) => [...prev, errorMsg])
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, messages, speak]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const toggleTTS = () => {
    if (isSpeaking) {
      synthRef.current?.cancel()
      setIsSpeaking(false)
      setAvatarPulse(false)
    }
    setTtsEnabled((prev) => !prev)
  }

  /* ────────────────────────────────────────────────────────
     RENDER
     ──────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Floating Action Button ── */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="ai-chat-fab"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close AI Chat' : 'Open AI Chat'}
        title="Ask My AI"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="sparkle"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
            </motion.svg>
          )}
        </AnimatePresence>
        {/* Pulse ring when closed */}
        {!isOpen && <span className="ai-chat-fab-pulse" />}
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          >
            {/* ── Header with Avatar ── */}
            <div className="ai-chat-header">
              <div className="ai-avatar-wrapper">
                <div className={`ai-avatar ${avatarPulse ? 'ai-avatar--speaking' : ''}`}>
                  <div className="ai-avatar-core" />
                  <div className="ai-avatar-ring ai-avatar-ring--1" />
                  <div className="ai-avatar-ring ai-avatar-ring--2" />
                  <div className="ai-avatar-ring ai-avatar-ring--3" />
                </div>
              </div>
              <div className="ai-chat-header-text">
                <h3>Ask My AI</h3>
                <p>{isSpeaking ? '🔊 Speaking...' : isLoading ? '⏳ Thinking...' : '● Online'}</p>
              </div>
              <button
                onClick={toggleTTS}
                className={`ai-tts-toggle ${ttsEnabled ? 'ai-tts-toggle--active' : ''}`}
                title={ttsEnabled ? 'Disable voice' : 'Enable voice'}
                aria-label={ttsEnabled ? 'Disable voice responses' : 'Enable voice responses'}
              >
                {ttsEnabled ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                )}
              </button>
            </div>

            {/* ── Messages Area ── */}
            <div className="ai-chat-messages">
              {messages.length === 0 && (
                <div className="ai-chat-welcome">
                  <p>
                    Hi! I'm Aditya's AI assistant. Ask me anything about his skills, projects, or
                    experience — I can even speak my answers! 🎙️
                  </p>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`ai-chat-bubble ${
                    msg.role === 'user' ? 'ai-chat-bubble--user' : 'ai-chat-bubble--ai'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="ai-chat-bubble-avatar">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
                      </svg>
                    </div>
                  )}
                  <div className="ai-chat-bubble-content">
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="ai-chat-bubble ai-chat-bubble--ai">
                  <div className="ai-chat-bubble-avatar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
                    </svg>
                  </div>
                  <div className="ai-chat-bubble-content">
                    <div className="ai-typing-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Suggestions rendered below the last message */}
              {suggestions.length > 0 && !isLoading && (
                <div className="ai-chat-suggestions">
                  {suggestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="ai-chat-chip"
                      disabled={isLoading}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input Area ── */}
            <form onSubmit={handleSubmit} className="ai-chat-input-area">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Aditya's skills, projects..."
                className="ai-chat-input"
                disabled={isLoading}
                maxLength={500}
                aria-label="Type your message"
              />
              <button
                type="submit"
                className="ai-chat-send"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
