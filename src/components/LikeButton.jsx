import React, { useState } from 'react';
import supabase from '../supabaseClient';

export default function LikeButton({ airdropId, initialLikes = 0, onLike }) {
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked || loading) return;
    setLoading(true);
    setLiked(true);
    setLikes(likes + 1);
    // Optimistic UI update
    if (onLike) onLike(likes + 1);
    // Update on Supabase
    await supabase.from('airdrops').update({ likes: likes + 1 }).eq('id', airdropId);
    setLoading(false);
  };

  return (
    <button
      className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors focus:outline-none ${liked ? 'text-pink-500' : 'text-muted'} hover:bg-accent2/10`}
      onClick={handleLike}
      disabled={liked || loading}
      aria-label="Like"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={liked ? '#ec4899' : 'none'}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.54 0-2.94.805-3.75 2.018A4.247 4.247 0 0 0 6 3.75c-2.761 0-5 2.015-5 4.5 0 7.22 9 11.25 9 11.25s9-4.03 9-11.25z"
        />
      </svg>
      <span className="font-semibold text-base">{likes}</span>
    </button>
  );
}
