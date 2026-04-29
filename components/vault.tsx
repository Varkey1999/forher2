'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Vault() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase.from('vault_messages').select('*').order('unlock_date', { ascending: true });
      if (data) setMessages(data);
    };
    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {messages.length === 0 ? <p className="text-center text-rose-300">No messages yet.</p> : messages.map((msg, idx) => {
        const isUnlocked = new Date() >= new Date(msg.unlock_date);
        return (
          <div key={idx} className={`p-5 rounded-2xl border ${isUnlocked ? 'bg-white border-rose-200 shadow-sm' : 'bg-zinc-50/50 border-zinc-200 opacity-70'}`}>
            <div className="text-xs text-rose-400 mb-2 font-bold uppercase tracking-widest">
              {new Date(msg.unlock_date).toLocaleDateString()}
            </div>
            {isUnlocked ? (
              <p className="text-zinc-800 leading-relaxed">{msg.content}</p>
            ) : (
              <p className="text-zinc-400 italic flex items-center gap-2">
                🔒 Locked until the date arrives...
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
