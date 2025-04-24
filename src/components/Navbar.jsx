import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import supabase from '../supabaseClient';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate('/auth'); // Navigate to login page after logout
    } else {
      alert('Logout failed: ' + error.message);
    }
  };

  // Menu items for reuse
  const menuItems = (
    <>
      <Link to="/" className="hover:text-accent block px-4 py-2" onClick={() => setMenuOpen(false)}>Home</Link>
      <Link to="/submit" className="hover:text-accent block px-4 py-2" onClick={() => setMenuOpen(false)}>Submit</Link>
      <Link to="/donate" className="hover:text-accent block px-4 py-2" onClick={() => setMenuOpen(false)}>Donate</Link>
      {!loading && user && <Link to="/dashboard" className="hover:text-accent block px-4 py-2" onClick={() => setMenuOpen(false)}>Bookmarks</Link>}
      <a href="/Public/Airdropedia_Overview_2025.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-accent block px-4 py-2" onClick={() => setMenuOpen(false)}>Blog</a>
    </>
  );

  return (
    <nav className="flex items-center justify-between py-6 px-2 md:px-0 max-w-5xl mx-auto w-full relative">
      <div className="flex items-center gap-4 min-w-0">
        <div className="bg-accent2 rounded-xl p-2 flex-shrink-0">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="8" fill="#2F80ED"/>
            <path d="M14 7L21 11V17L14 21L7 17V11L14 7Z" fill="#00E1FF"/>
          </svg>
        </div>
        <span className="text-xl font-extrabold tracking-wide ml-2 whitespace-nowrap">AIRDROPEDIA</span>
      </div>
      {/* Desktop Menu */}
      <div className="hidden lg:flex flex-1 justify-center">
        <div className="flex gap-8 items-center text-muted text-base">
          <Link to="/" className="hover:text-accent">Home</Link>
          <Link to="/submit" className="hover:text-accent">Submit</Link>
          <Link to="/donate" className="hover:text-accent">Donate</Link>
          {!loading && user && (
            <Link to="/dashboard" className="hover:text-accent">Bookmarks</Link>
          )}
          <a href="/Public/Airdropedia_Overview_2025.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Blog</a>
        </div>
      </div>
      <div className="hidden lg:flex items-center ml-4">
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
      {/* Hamburger Icon */}
      <button
        className="lg:hidden flex items-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open menu"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path stroke="#2F80ED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16"/>
        </svg>
      </button>
      {/* Mobile/Tablet Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMenuOpen(false)}>
          <div
            className="absolute top-0 right-0 w-64 h-full bg-background shadow-xl flex flex-col pt-8"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-accent2"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="#2F80ED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <div className="flex flex-col gap-2 mt-8 text-muted text-lg">
              {menuItems}
              <div className="mt-4">
                {user ? (
                  <button
  onClick={() => { setMenuOpen(false); handleLogout(); }}
  className="w-full bg-card border border-accent2 text-accent2 px-3 py-1.5 rounded-lg font-semibold text-base hover:bg-accent2 hover:text-white transition-colors"
>
  Log out
</button>
                ) : (
                  <button
  className="w-full bg-card border border-accent2 text-accent2 px-3 py-1.5 rounded-lg font-semibold text-base hover:bg-accent2 hover:text-white transition-colors"
  onClick={() => { setMenuOpen(false); navigate('/auth'); }}
>
  Get Started
</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
