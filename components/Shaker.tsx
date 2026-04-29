'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ALL_ITEMS = [
  {
    text: "I love the way you exist in my life.",
    image: "/love1.jpg",
  },
  {
    text: "You make ordinary moments feel magical.",
    image: "/love2.jpg",
  },
  {
    text: "Every version of you is my favourite.",
    image: "/love3.jpg",
  },
  {
    text: "With you, everything feels right.",
    image: "/love4.jpg",
  },
  {
    text: "You are my calm and my chaos.",
    image: "/love5.jpg",
  },
  {
    text: "I didn't know love could feel this safe.",
    image: "/love6.jpg",
  },
]

export default function Shaker() {
  const [current, setCurrent] = useState<any>(null)
  const [shownToday, setShownToday] = useState<any[]>([])
  const [error, setError] = useState('')
  const [animateKey, setAnimateKey] = useState(0)

  const today = new Date().toDateString()

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('love') || '{}')

    if (stored.date === today) {
      setShownToday(stored.items || [])
    } else {
      localStorage.setItem(
        'love',
        JSON.stringify({ date: today, items: [] })
      )
      setShownToday([])
    }
  }, [])

  const handleClick = () => {
    let updated = [...shownToday]

    if (updated.length < 2) {
      const remaining = ALL_ITEMS.filter(
        (item) =>
          !updated.find((u) => u.text === item.text)
      )

      const newItem =
        remaining[Math.floor(Math.random() * remaining.length)]

      updated.push(newItem)

      localStorage.setItem(
        'love',
        JSON.stringify({ date: today, items: updated })
      )

      setShownToday(updated)
      setCurrent(newItem)
      setError('')
    } else {
      const randomOld =
        updated[Math.floor(Math.random() * updated.length)]

      setCurrent(randomOld)
      setError('You exhausted attempts for today')
    }

    setAnimateKey((prev) => prev + 1)
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
        {current && (
          <motion.div
            key={animateKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-md px-4"
          >
            {current.image && (
              <img
                src={current.image}
                className="w-full h-48 object-cover rounded-xl mb-4 shadow-md"
              />
            )}

            <p className="text-xl">{current.text}</p>
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