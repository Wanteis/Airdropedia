import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const BLOCKCHAINS = [
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

import { useAuth } from '../context/AuthContext';

const Submit = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Auto-hide success popup after 5 seconds with fade-out
  useEffect(() => {
    if (showSuccess) {
      setFadeOut(false);
      const timer = setTimeout(() => setFadeOut(true), 4800);
      const hideTimer = setTimeout(() => setShowSuccess(false), 5000);
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [showSuccess]);
  const [media, setMedia] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    console.log('Submit button clicked');
    e.preventDefault();
    setError('');
    if (!user) {
      setShowModal(true);
      return;
    }
    setLoading(true);
    try {
      const form = e.target;
      const projectName = form.projectName.value;
      const blockchain = form.blockchain.value;
      const ticker = form.ticker.value;
      const cost = form.cost.value;
      const referral = form.referral.value;
      let media_url = '';

      if (media) {
        console.log('Uploading media:', media);
        // Upload file to Supabase Storage
        const fileExt = media.name.split('.').pop();
        const filePath = `${user.id}/${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('airdrops-media')
          .upload(filePath, media);
        if (uploadError) {
          console.error('Upload error:', JSON.stringify(uploadError));
          throw uploadError;
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('airdrops-media')
          .getPublicUrl(filePath);
        media_url = publicUrlData.publicUrl;
        console.log('Media public URL:', media_url);
      }

      // Check for duplicate airdrop by ticker (case-insensitive) or referral link (exact)
      const { data: existingAirdrops, error: checkError } = await supabase
        .from('airdrops')
        .select('id')
        .or(`lower(ticker).eq.${ticker.toLowerCase()},referral_link.eq.${referral}`);
      if (checkError) {
        throw checkError;
      }
      if (existingAirdrops && existingAirdrops.length > 0) {
        setError('Airdrop already exists.');
        setLoading(false);
        return;
      }
      // Insert into airdrops table
      const { error: insertError } = await supabase
        .from('airdrops')
        .insert([
          {
            project_name: projectName,
            blockchain,
            ticker,
            cost,
            referral_link: referral,
            media_url,
            user_id: user.id,
          },
        ]);
      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }
      console.log('Airdrop inserted successfully');
      // Optionally reset form or show success
      form.reset();
      setMedia(null);
      setShowSuccess(true);
    } catch (err) {
      console.error('Submission error:', JSON.stringify(err));
      setError(err.message || 'Submission failed.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center pt-10 pb-10 px-2">
  <div className="w-full flex flex-col items-center justify-center">

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-card p-6 rounded-2xl shadow-lg border border-accent2/30 max-w-sm w-full text-center">
            <h3 className="text-lg font-bold mb-2">Please sign up or log in first.</h3>
            <button
              className="mt-4 bg-accent2 text-white font-semibold py-2 px-6 rounded-lg hover:bg-accent transition-colors"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Error Modal */}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-card p-6 rounded-2xl shadow-lg border border-accent2/30 max-w-sm w-full text-center">
            <h3 className="text-lg font-bold mb-2 text-red-600">{error}</h3>
            <button
              className="mt-4 bg-accent2 text-white font-semibold py-2 px-6 rounded-lg hover:bg-accent transition-colors"
              onClick={() => setError('')}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-md md:max-w-lg sm:max-w-full bg-card rounded-2xl shadow-card p-8 sm:p-4 flex flex-col gap-6 border border-accent2/20 mx-auto items-stretch">
    <h2 className="text-4xl font-extrabold mb-4 mt-8 text-center">Submit an Airdrop</h2>
        {/* Project Name */}
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="projectName">Project's Name</label>
          <input
            id="projectName"
            name="projectName"
            type="text"
            required
            className="w-full rounded-lg bg-background border border-accent2/30 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent2"
            placeholder="e.g. Pixel Protocol"
          />
        </div>
        {/* Blockchain Dropdown */}
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="blockchain">Blockchain</label>
          <div className="relative">
            <select
              id="blockchain"
              name="blockchain"
              required
              className="w-full appearance-none rounded-lg bg-background border border-accent2/30 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent2 pr-10"
            >
              <option value="" disabled selected>Select blockchain</option>
              {BLOCKCHAINS.map((chain) => (
                <option key={chain} value={chain}>{chain}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-accent2"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
        </div>
        {/* Ticker */}
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="ticker">Ticker</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted font-bold">$</span>
            <input
              id="ticker"
              name="ticker"
              type="text"
              required
              className="w-full rounded-lg bg-background border border-accent2/30 pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent2"
              placeholder="TICKER"
              maxLength={8}
            />
          </div>
        </div>
        {/* Cost Dropdown */}
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="cost">Cost</label>
          <div className="relative">
            <select
              id="cost"
              name="cost"
              required
              className="w-full appearance-none rounded-lg bg-background border border-accent2/30 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent2 pr-10"
            >
              <option value="" disabled selected>Select cost</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-accent2"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
        </div>
        {/* Referral Link */}
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="referral">Referral Link</label>
          <input
            id="referral"
            name="referral"
            type="url"
            required
            className="w-full rounded-lg bg-background border border-accent2/30 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent2"
            placeholder="https://airdrop-project.com/referral"
          />
        </div>
        {/* Upload Media */}
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="media">Upload Media</label>
          <div
            className={
              `relative flex flex-col items-center justify-center w-full h-36 rounded-2xl border-2 border-dashed border-accent2/40 bg-background transition hover:bg-accent2/10 cursor-pointer ${media ? 'border-accent2 bg-accent2/5' : ''}`
            }
            onClick={() => document.getElementById('media').click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setMedia(e.dataTransfer.files[0]);
              }
            }}
          >
            <input
              id="media"
              name="media"
              type="file"
              accept="image/*,video/*"
              onChange={e => setMedia(e.target.files[0])}
              className="hidden"
            />
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="mb-2 text-accent2"><path d="M12 16v-4m0 0V8m0 4H8m4 0h4m3 4.5V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v9.5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/></svg>
            <span className="text-muted text-sm select-none">
              Drag and drop here or <span className="text-accent2 underline">browse</span>
            </span>
            {media && (
              <div className="mt-2 text-xs text-muted">Selected: {media.name}</div>
            )}
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 bg-accent2 text-white font-semibold py-3 rounded-lg hover:bg-accent transition-colors shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
    {/* Success Popup */}
    {showSuccess && (
      <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-card border border-accent2/30 shadow-card rounded-xl flex items-center gap-4 px-6 py-4 animate-fade-in transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        <span className="inline-flex items-center justify-center w-8 h-8 bg-accent2/10 rounded-full">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="10" fill="currentColor" className="text-accent2"/>
            <path d="M6 10.5l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="text-accent2 font-semibold text-base">Airdrop added successfully.</span>
      </div>
    )}
  </div>
  );
};

export default Submit;
