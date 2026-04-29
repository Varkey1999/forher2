'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Shaker from '../components/Shaker';
import Vault from '../components/Vault';
import Countdown from '../components/Countdown';
import { Dancing_Script } from 'next/font/google';

const handwriting = Dancing_Script({ subsets: ['latin'] });

export default function Home() {
  const [tab, setTab] = useState('shaker');

  return (
    <main className="max-w-md mx-auto min-h-screen bg-[#fff5f4] flex flex-col shadow-xl">
      
      {/* HEADER */}
      <header className="p-8 text-center pt-12 bg-white/60 backdrop-blur-sm border-b border-[#f2d6d3]">
        <h1
          className={`${handwriting.className} text-5xl text-[#990F02]`}
        >
          You and I
        </h1>
      </header>

      {/* CONTENT */}
      <section className="flex-1 py-8 px-6 overflow-y-auto">
        {tab === 'shaker' && <Shaker />}
        {tab === 'vault' && <Vault />}
        {tab === 'timer' && <Countdown />}
      </section>

      {/* NAVIGATION */}
      <nav className="flex justify-around items-center p-6 bg-white border-t border-[#f2d6d3] pb-10">
        
        {['shaker', 'vault', 'timer'].map((item) => (
          <motion.button
            key={item}
            onClick={() => setTab(item)}
            whileTap={{ scale: 0.9 }}
            animate={{
              backgroundColor:
                tab === item ? '#990F02' : 'transparent',
              color: tab === item ? '#fff' : '#c9a3a0',
            }}
            className="px-4 py-2 rounded-full text-sm font-bold transition-all"
          >
            {item.toUpperCase()}
          </motion.button>
        ))}

      </nav>
    </main>
  );
}