'use client';
import { useState } from 'react';
import Shaker from '@/components/Shaker';
import Vault from '@/components/Vault';
import Countdown from '@/components/Countdown';

export default function Home() {
  const [tab, setTab] = useState('shaker');

  return (
    <main className="max-w-md mx-auto min-h-screen bg-rose-50/30 flex flex-col shadow-xl">
      <header className="p-8 text-center pt-12 bg-white/50 backdrop-blur-sm border-b border-rose-100">
        <h1 className="text-4xl font-serif font-bold text-rose-900 italic">
          For You
        </h1>
      </header>

      <section className="flex-1 py-8 px-6 overflow-y-auto">
        {tab === 'shaker' && <Shaker />}
        {tab === 'vault' && <Vault />}
        {tab === 'timer' && <Countdown />}
      </section>

      <nav className="flex justify-around items-center p-6 bg-white border-t border-rose-100 pb-10">
        <button 
          onClick={() => setTab('shaker')} 
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${tab === 'shaker' ? 'bg-rose-500 text-white' : 'text-rose-300'}`}
        >
          SHAKER
        </button>
        <button 
          onClick={() => setTab('vault')} 
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${tab === 'vault' ? 'bg-rose-500 text-white' : 'text-rose-300'}`}
        >
          VAULT
        </button>
        <button 
          onClick={() => setTab('timer')} 
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${tab === 'timer' ? 'bg-rose-500 text-white' : 'text-rose-300'}`}
        >
          TIMERS
        </button>
      </nav>
    </main>
  );
}
