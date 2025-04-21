import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import supabase from '../supabaseClient';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };
  return (
    <nav className="flex items-center justify-between py-6 px-2 md:px-0 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-4 min-w-0">
        <div className="bg-accent2 rounded-xl p-2 flex-shrink-0">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="8" fill="#2F80ED"/>
            <path d="M14 7L21 11V17L14 21L7 17V11L14 7Z" fill="#00E1FF"/>
          </svg>
        </div>
        <span className="text-xl font-extrabold tracking-wide ml-2 whitespace-nowrap">AIRDROPEDIA</span>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="flex gap-8 items-center text-muted text-base">
          <Link to="/" className="hover:text-accent">Home</Link>
          <Link to="/submit" className="hover:text-accent">Submit</Link>
          <Link to="/donate" className="hover:text-accent">Donate</Link>
          <Link to="/Public/Airdropedia_Overview_2025.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Blog</Link>
        </div>
      </div>
      <div className="flex items-center ml-4">
        {user ? (
          <button onClick={handleLogout} className="bg-card border border-accent2 text-accent2 px-5 py-2 rounded-xl font-semibold hover:bg-accent2 hover:text-white transition-colors">Log out</button>
        ) : (
          <button
            className="bg-card border border-accent2 text-accent2 px-5 py-2 rounded-xl font-semibold hover:bg-accent2 hover:text-white transition-colors"
            onClick={() => navigate('/auth')}
          >
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
