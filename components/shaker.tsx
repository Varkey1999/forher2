'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Shaker() {
  const [moment, setMoment] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const shake = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('shaker_moments').select('*');
    if (data && data.length > 0) {
      const random = data[Math.floor(Math.random() * data.length)];
      setMoment(random);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6 text-center">
      <button 
        onClick={shake}
        disabled={loading}
        className="px-6 py-3 bg-rose-500 text-white font-bold rounded-full shadow-lg hover:bg-rose-600 transition disabled:opacity-50"
      >
        {loading ? 'Finding a memory...' : 'Shake for a Surprise'}
      </button>
      {moment && (
        <div className="mt-8 animate-fade-in w-full">
          <img src={moment.image_url} alt="Memory" className="w-full h-64 object-cover rounded-xl shadow-md" />
          <p className="mt-6 text-xl text-rose-900 italic font-serif leading-relaxed">"{moment.caption}"</p>
        </div>
      )}
    </div>
  );
}
