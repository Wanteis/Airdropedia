import React, { useState } from 'react';
import AirdropCard from './AirdropCard';
import supabase from '../supabaseClient';

const AirdropList = ({ airdrops, setAirdrops, refreshAirdrops }) => {
  // Edit handler
  const handleEdit = async (updated) => {
    try {
      const { id, ...fields } = updated;
      console.log('[AirdropList] Edit requested:', { id, fields });
      const { error, data } = await supabase
        .from('airdrops')
        .update(fields)
        .eq('id', id)
        .select();
      console.log('[AirdropList] Edit response:', { error, data });
      if (error) throw error;
      if (data && data.length > 0 && setAirdrops) {
        setAirdrops(prev => prev.map(a => a.id === id ? data[0] : a));
      }
      // Optionally, you can still call refreshAirdrops if setAirdrops is not available
    } catch (err) {
      alert('Failed to update airdrop: ' + (err.message || JSON.stringify(err)));
      console.error('[AirdropList] Edit error:', err);
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      console.log('[AirdropList] Delete requested:', { id });
      const { error } = await supabase
        .from('airdrops')
        .delete()
        .eq('id', id);
      console.log('[AirdropList] Delete response:', { error });
      if (error) throw error;
      if (setAirdrops) {
        setAirdrops(prev => prev.filter(a => a.id !== id));
      }
      // Optionally, you can still call refreshAirdrops if setAirdrops is not available
    } catch (err) {
      alert('Failed to delete airdrop: ' + (err.message || JSON.stringify(err)));
      console.error('[AirdropList] Delete error:', err);
    }
  };


  if (!airdrops.length) {
    return <div className="bg-card rounded-xl p-8 text-center text-muted mt-4">No airdrops found.</div>;
  }
  // Sort airdrops by id ascending (oldest first)
  const sortedAirdrops = [...airdrops].sort((a, b) => a.id - b.id);
  const isHome = window.location.pathname === '/';
  let displayedAirdrops = sortedAirdrops;
  let showViewMore = false;

  if (isHome) {
    displayedAirdrops = sortedAirdrops.slice(0, 12);
    showViewMore = sortedAirdrops.length > 12;
  } else if (window.location.pathname === '/airdrops') {
    displayedAirdrops = sortedAirdrops.slice(12).reverse(); // Newest first for rest
  }

  if (!displayedAirdrops.length) {
    return <div className="bg-card rounded-xl p-8 text-center text-muted mt-4">No airdrops found.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-4">
        {displayedAirdrops.map((airdrop) => (
          <AirdropCard key={airdrop.id} airdrop={airdrop} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
      {isHome && showViewMore && (
        <div className="flex justify-center mt-8">
          <button
            className="border border-blue-500 text-blue-500 bg-transparent font-semibold rounded-xl px-8 py-2 text-lg transition hover:bg-blue-900/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => window.location.href = '/airdrops'}
          >
            View More
          </button>
        </div>
      )}
    </>
  );
};

// Card component for featured airdrops grid
AirdropList.Card = function FeaturedCard({ airdrop, featured }) {
  return <AirdropCard airdrop={airdrop} featured={featured} />;
};

export default AirdropList;
