import React, { useEffect, useState } from 'react';
import AirdropList from '../components/AirdropList';
import supabase from '../supabaseClient';

const Airdrops = () => {
  const [airdrops, setAirdrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAirdrops = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('airdrops').select('*').order('id', { ascending: false });
    if (!error) setAirdrops(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAirdrops();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 pt-10 pb-20">
      <h1 className="text-3xl font-bold mb-8 text-center">All Airdrops</h1>
      <section className="mt-8 flex flex-col items-center justify-center">
        {loading ? (
          <div className="py-32 text-center">
            <svg width="56" height="56" fill="none" className="mx-auto mb-6" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="28" r="28" fill="#151A2B"/><path d="M18 28a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm10-5v6m0 4h.01" stroke="#00E1FF" strokeWidth="2.5" strokeLinecap="round"/></svg>
            <h2 className="text-2xl font-bold mb-2">Loading all airdrops...</h2>
          </div>
        ) : (
          <AirdropList airdrops={airdrops} setAirdrops={setAirdrops} refreshAirdrops={fetchAirdrops} />
        )}
      </section>
    </main>
  );
};

export default Airdrops;
