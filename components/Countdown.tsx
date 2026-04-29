'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EVENTS = [
  {
    title: 'Next Date',
    date: '2026-05-01T18:00:00',
  },
  {
    title: 'Anniversary',
    date: '2026-06-10T00:00:00',
  },
  {
    title: 'Trip Together',
    date: '2026-07-01T09:00:00',
  },
]

export default function Countdown() {
  const [index, setIndex] = useState(0)
  const [now, setNow] = useState(new Date())
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getTime = (date: string) => {
    const diff = new Date(date).getTime() - now.getTime()

    if (diff <= 0) return 'It’s happening ❤️'

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const mins = Math.floor((diff / (1000 * 60)) % 60)
    const secs = Math.floor((diff / 1000) % 60)

    return `${days}d ${hours}h ${mins}m ${secs}s`
  }

  const next = () => {
    setDirection(1)
    setIndex((prev) => (prev + 1) % EVENTS.length)
  }

  const prev = () => {
    setDirection(-1)
    setIndex((prev) => (prev - 1 + EVENTS.length) % EVENTS.length)
  }

  return (
    <div className="flex items-center justify-center h-full">

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: direction * 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction * -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center w-full max-w-sm"
        >
          <h2 className="text-xl mb-4 text-[#990F02]">
            {EVENTS[index].title}
          </h2>

          <p className="text-2xl font-bold">
            {getTime(EVENTS[index].date)}
          </p>

          <div className="flex justify-between mt-6">
            <button onClick={prev} className="text-sm text-gray-400">
              ←
            </button>
            <button onClick={next} className="text-sm text-gray-400">
              →
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  )
}