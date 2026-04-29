'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dancing_Script } from 'next/font/google'
import { supabase } from '../lib/supabase'

const handwriting = Dancing_Script({ subsets: ['latin'] })

export default function Vault() {
  const [data, setData] = useState<any>(null)
  const [revealed, setRevealed] = useState(false)
  const [loading, setLoading] = useState(true)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('vault')
        .select('*')
        .eq('date', today)
        .single()

      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleReveal = () => {
    if (!data) return
    setRevealed(true)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10">

      {/* CARD */}
      <div className="relative w-full max-w-sm h-64 rounded-2xl overflow-hidden shadow-lg bg-gray-200">

        {/* LOCKED STATE */}
        {!revealed && (
          <motion.div
            onClick={handleReveal}
            whileTap={{ scale: 0.95 }}
            className="absolute inset-0 bg-[#990F02] flex items-center justify-center cursor-pointer"
          >
            <span className={`${handwriting.className} text-white text-3xl`}>
              Reveal
            </span>
          </motion.div>
        )}

        {/* REVEALED CONTENT */}
        <AnimatePresence>
          {revealed && data && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 text-center"
            >
              {data.image_url && (
                <img
                  src={data.image_url}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              )}

              <p className="text-lg">{data.message}</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* EMPTY STATE */}
      {!loading && !data && (
        <p className="text-gray-500 text-sm">
          Surprise is cooking, my love!
        </p>
      )}

    </div>
  )
}