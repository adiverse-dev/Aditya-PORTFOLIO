import { motion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function CustomCursor() {
  const reduced = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const cursorX = useSpring(0, { stiffness: 500, damping: 38, mass: 0.5 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 38, mass: 0.5 })
  const ringX = useSpring(0, { stiffness: 150, damping: 22, mass: 0.8 })
  const ringY = useSpring(0, { stiffness: 150, damping: 22, mass: 0.8 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    setEnabled(fine && !coarse && !reduced)

    if (!fine || coarse || reduced) return

    document.body.classList.add('custom-cursor-active')

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)
    }

    const down = () => setClicking(true)
    const up = () => setClicking(false)

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovering(
        !!target.closest('a, button, [data-cursor="hover"], input, textarea, label'),
      )
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [reduced, cursorX, cursorY, ringX, ringY])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff3b4a] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: clicking ? 0.6 : hovering ? 0.5 : 1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[199] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#ff3b4a]/50"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 56 : clicking ? 28 : 40,
          height: hovering ? 56 : clicking ? 28 : 40,
          borderColor: hovering ? 'rgba(255, 59, 74, 0.9)' : 'rgba(255, 59, 74, 0.35)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </>
  )
}
