'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Countdown() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase.from('countdown_events').select('*').order('target_date', { ascending: true });
      if (data) setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      {events.length === 0 ? <p className="text-center text-rose-300">No events added yet.</p> : events.map((ev, idx) => (
        <div key={idx} className="relative rounded-2xl overflow-hidden h-48 shadow-lg group">
          <img src={ev.image_url} alt={ev.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white font-bold text-2xl tracking-tight">{ev.title}</h3>
            <p className="text-rose-200 text-sm mt-1 font-medium tracking-wide">
              {new Date(ev.target_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
