import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AirdropList from './components/AirdropList';
import Footer from './components/Footer';
import Submit from './pages/Submit';
import Donate from './pages/Donate';
import Auth from './pages/Auth';
import Airdrops from './pages/Airdrops';
import PageTransition from './components/PageTransition';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Placeholder data for airdrops
const featuredAirdrops = [
  {
    id: 1,
    name: 'Token Airdrop',
    symbol: 'TKN',
    status: 'Live',
    endsIn: '15 days',
    icon: 'token',
    type: 'Airdrop',
  },
  {
    id: 2,
    name: 'Inr Airdrop',
    symbol: 'INR',
    status: 'Live',
    endsIn: '22 days',
    icon: 'inr',
    type: 'Airdrop',
  },
  {
    id: 3,
    name: 'Guard Airdrop',
    symbol: 'GUARD',
    status: 'Upcoming',
    startsIn: '7 days',
    icon: 'guard',
    type: 'Airdrop',
  },
  {
    id: 4,
    name: 'Pixel Airdrop',
    symbol: 'PIXEL',
    status: 'Upcoming',
    startsIn: '12 days',
    icon: 'pixel',
    type: 'Airdrop',
  },
];

const latestAirdrops = [
  {
    id: 1,
    name: 'Token Airdrop',
    symbol: 'TKN',
    status: 'Live',
    endsIn: '15 days',
    icon: 'token',
    type: 'Airdrop',
  },
  {
    id: 2,
    name: 'Inr Airdrop',
    symbol: 'INR',
    status: 'Live',
    endsIn: '22 days',
    icon: 'inr',
    type: 'Airdrop',
  },
  {
    id: 3,
    name: 'Guard Airdrop',
    symbol: 'GUARD',
    status: 'Upcoming',
    startsIn: '7 days',
    icon: 'guard',
    type: 'Airdrop',
  },
];

function App() {
  const [filter, setFilter] = useState('All');
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <PageTransition keyId={location.key}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/airdrops" element={<Airdrops />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </PageTransition>
      </div>
      <Footer />
    </div>
  );
}

import { AuthProvider } from './context/AuthContext';
import supabase from './supabaseClient';
import { useEffect } from 'react';

const HomePage = () => {
  const [airdrops, setAirdrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [blockchain, setBlockchain] = useState('All');
  const [cost, setCost] = useState('All');
  const [sort, setSort] = useState('latest');

  // Fetch airdrops from Supabase
  const fetchAirdrops = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('airdrops').select('*').order('id', { ascending: false });
    if (!error) setAirdrops(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAirdrops();
  }, []);

  // Filter and sort airdrops
  const filteredAirdrops = airdrops
    .filter(a =>
      (blockchain === 'All' || a.blockchain === blockchain) &&
      (cost === 'All' || a.cost === cost) &&
      (
        !search ||
        a.project_name?.toLowerCase().includes(search.toLowerCase()) ||
        a.ticker?.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sort === 'latest') return b.id - a.id;
      if (sort === 'oldest') return a.id - b.id;
      return 0;
    });

  return (
    <main className="max-w-5xl mx-auto px-4 pt-10 pb-20">
      <Hero
        search={search}
        setSearch={setSearch}
        blockchain={blockchain}
        setBlockchain={setBlockchain}
        cost={cost}
        setCost={setCost}
        sort={sort}
        setSort={setSort}
      />
      <section className="mt-16 flex flex-col items-center justify-center">
        {loading ? (
          <div className="py-32 text-center">
            <svg width="56" height="56" fill="none" className="mx-auto mb-6" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="28" r="28" fill="#151A2B"/><path d="M18 28a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm10-5v6m0 4h.01" stroke="#00E1FF" strokeWidth="2.5" strokeLinecap="round"/></svg>
            <h2 className="text-2xl font-bold mb-2">No airdrops have been added yet</h2>
            <p className="text-muted mb-2">Once airdrops are added, they will appear here for you to discover and explore.</p>
          </div>
        ) : (
          <AirdropList airdrops={filteredAirdrops} setAirdrops={setAirdrops} refreshAirdrops={fetchAirdrops} />
        )}
      </section>
    </main>
  );
};


const AppWrapper = () => (
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);

export default AppWrapper;


