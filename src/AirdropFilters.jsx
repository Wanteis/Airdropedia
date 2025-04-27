import React, { useRef, useState, useEffect } from 'react';

const BLOCKCHAINS = [
  'All',
  'Ethereum',
  'Binance Smart Chain',
  'Solana',
  'Arbitrum',
  'Avalanche',
  'Base',
  'Ton',
  'Sui',
  'Other',
];

const COSTS = ['All', 'Free', 'Paid'];
const SORTS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
];

export default function AirdropFilters({ blockchain, setBlockchain, cost, setCost, sort, setSort }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="w-full max-w-xl h-14 flex items-center justify-center gap-3 bg-card border border-accent2/20 rounded-xl px-6 py-0 text-lg font-semibold text-accent2 hover:bg-accent2/10 transition-colors shadow-sm"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <svg width="22" height="22" fill="none" viewBox="0 0 20 20"><path d="M3 6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4A1 1 0 0 1 3 7V6Zm2 6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1Zm3 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1Z" fill="currentColor"/></svg>
        Filters
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-card border border-accent2/20 rounded-xl shadow-lg z-20 p-4 flex flex-col gap-4 animate-fade-in">
          <div>
            <label className="block text-xs font-semibold mb-1 text-muted">Blockchain</label>
            <select
              className="w-full bg-background border border-accent2/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent2"
              value={blockchain}
              onChange={e => setBlockchain(e.target.value)}
            >
              {BLOCKCHAINS.map(chain => (
                <option key={chain} value={chain}>{chain}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-muted">Cost</label>
            <select
              className="w-full bg-background border border-accent2/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent2"
              value={cost}
              onChange={e => setCost(e.target.value)}
            >
              {COSTS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-muted">Sort By</label>
            <select
              className="w-full bg-background border border-accent2/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent2"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              {SORTS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}



