'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ALL_MESSAGES = [
  "I love the way you exist in my life.",
  "You make ordinary moments feel magical.",
  "Every version of you is my favourite.",
  "With you, everything feels right.",
  "You are my calm and my chaos.",
  "I didn't know love could feel this safe.",
]

export default function Shaker() {
  const [currentMessage, setCurrentMessage] = useState('')
  const [shownToday, setShownToday] = useState<string[]>([])
  const [error, setError] = useState('')
  const [animateKey, setAnimateKey] = useState(0)

  const today = new Date().toDateString()

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('love') || '{}')

    if (stored.date === today) {
      setShownToday(stored.messages || [])
    } else {
      localStorage.setItem(
        'love',
        JSON.stringify({ date: today, messages: [] })
      )
      setShownToday([])
    }
  }, [])

  const handleClick = () => {
    let updated = [...shownToday]

    if (updated.length < 2) {
      const remaining = ALL_MESSAGES.filter(m => !updated.includes(m))
      const newMsg =
        remaining[Math.floor(Math.random() * remaining.length)]

      updated.push(newMsg)

      localStorage.setItem(
        'love',
        JSON.stringify({ date: today, messages: updated })
      )

      setShownToday(updated)
      setCurrentMessage(newMsg)
      setError('')
    } else {
      const randomOld =
        updated[Math.floor(Math.random() * updated.length)]

      setCurrentMessage(randomOld)
      setError('You exhausted attempts for today')
    }

    setAnimateKey(prev => prev + 1)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10">
      
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.6 }}
        className="bg-[#990F02] text-white px-6 py-3 rounded-full text-lg shadow-lg"
      >
        Hum the love
      </motion.button>

      <AnimatePresence mode="wait">
        {currentMessage && (
          <motion.div
            key={animateKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center text-xl max-w-md px-4"
          >
            {currentMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}