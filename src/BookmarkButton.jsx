import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

// This component has been removed as the bookmark feature is deprecated.
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  // For non-auth users, use localStorage
  useEffect(() => {
    if (user) {
      // Authenticated: fetch from Supabase
      const fetchBookmark = async () => {
        const { data } = await supabase
          .from('bookmarks')
          .select('id')
          .eq('user_id', user.id)
          .eq('airdrop_id', airdropId)
          .single();
        setBookmarked(!!data);
      };
      fetchBookmark();
    } else {
      // Non-auth: fetch from localStorage
      const local = JSON.parse(localStorage.getItem('airdrop_bookmarks') || '[]');
      setBookmarked(local.includes(airdropId));
    }
  }, [user, airdropId]);

  const handleToggleBookmark = async () => {
    if (loading) return;
    setLoading(true);
    if (user) {
      if (!bookmarked) {
        // Add bookmark to Supabase
        const { error } = await supabase.from('bookmarks').insert({ user_id: user.id, airdrop_id: airdropId });
        if (!error) setBookmarked(true);
      } else {
        // Remove bookmark from Supabase
        await supabase.from('bookmarks').delete().eq('user_id', user.id).eq('airdrop_id', airdropId);
        setBookmarked(false);
      }
    } else {
      // Non-auth: use localStorage
      let local = JSON.parse(localStorage.getItem('airdrop_bookmarks') || '[]');
      if (!bookmarked) {
        local.push(airdropId);
        setBookmarked(true);
      } else {
        local = local.filter(id => id !== airdropId);
        setBookmarked(false);
      }
      localStorage.setItem('airdrop_bookmarks', JSON.stringify(local));
    }
    setLoading(false);
    if (onChange) onChange(!bookmarked);
  };

  return (
    <button
      className={`flex items-center px-2 py-1 rounded-full transition-colors focus:outline-none hover:bg-accent2/10`}
      onClick={handleToggleBookmark}
      disabled={loading}
      aria-label={bookmarked ? 'Remove Bookmark' : 'Bookmark'}
      type="button"
      title={bookmarked ? 'Remove Bookmark' : 'Bookmark'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill={bookmarked ? '#2979f3' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke={bookmarked ? '#2979f3' : '#888'} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75v10.19a.75.75 0 01-1.14.64l-3.11-1.85a.75.75 0 00-.76 0l-3.11 1.85a.75.75 0 01-1.14-.64V6.75A2.25 2.25 0 016.75 4.5h10.5A2.25 2.25 0 0119.5 6.75z" />
      </svg>
    </button>
  );
}

