import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import AirdropCard from '../components/AirdropCard';

export default function Dashboard() {
  const { user } = useAuth();
  const [airdrops, setAirdrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchBookmarkedAirdrops = async () => {
      const { data: bookmarks, error } = await supabase
        .from('bookmarks')
        .select('airdrop_id')
        .eq('user_id', user.id);
      if (error || !bookmarks) {
        setAirdrops([]);
        setLoading(false);
        return;
      }
      const airdropIds = bookmarks.map(b => b.airdrop_id);
      if (!airdropIds.length) {
        setAirdrops([]);
        setLoading(false);
        return;
      }
      const { data: airdropsData } = await supabase
        .from('airdrops')
        .select('*')
        .in('id', airdropIds);
      setAirdrops(airdropsData || []);
      setLoading(false);
    };
    fetchBookmarkedAirdrops();
  }, [user]);

  if (!user) {
    return <div className="py-32 text-center text-lg text-muted">Please log in to view your dashboard.</div>;
  }

  return (
    <main className="max-w-4xl mx-auto px-4 pt-10 pb-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Bookmarks</h1>
      {loading ? (
        <div className="py-32 text-center">Loading...</div>
      ) : airdrops.length === 0 ? (
        <div className="py-32 text-center text-lg text-muted">No bookmarks yet.</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {airdrops.map(airdrop => (
            <AirdropCard key={airdrop.id} airdrop={airdrop} />
          ))}
        </div>
      )}
    </main>
  );
}
