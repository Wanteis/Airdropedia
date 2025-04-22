import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const icons = {
  token: (
    <span className="bg-accent2/10 rounded-full p-3">
      <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#00E1FF"/><path d="M10 16h12M16 10v12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
    </span>
  ),
  inr: (
    <span className="bg-accent2/10 rounded-full p-3">
      <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#2F80ED"/><path d="M18 10h-4v12M10 16h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
    </span>
  ),
  guard: (
    <span className="bg-accent2/10 rounded-full p-3">
      <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#FFD600"/><path d="M16 10l6 4v4l-6 4-6-4v-4l6-4z" fill="#151A2B"/></svg>
    </span>
  ),
  pixel: (
    <span className="bg-accent2/10 rounded-full p-3">
      <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#7B61FF"/><rect x="10" y="10" width="12" height="12" rx="3" fill="#fff"/></svg>
    </span>
  ),
};


const AirdropCard = ({ airdrop, featured, onEdit, onDelete }) => {
  const cardRef = useRef(null);
  const { user } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editData, setEditData] = useState({ ...airdrop });

  const handleEdit = () => setShowEdit(true);
  const handleDelete = () => setShowDelete(true);

  const handleEditSave = () => {
    if (onEdit) onEdit(editData);
    setShowEdit(false);
  };
  const handleDeleteConfirm = () => {
    if (onDelete) onDelete(airdrop.id);
    setShowDelete(false);
  };

  return (
    <>
      <div ref={cardRef} className={`relative rounded-3xl bg-gradient-to-br from-accent2/10 to-background px-4 py-4 w-[260px] min-w-0 min-h-[320px] flex flex-col justify-between shadow-2xl border border-accent2/15 ${featured ? 'min-h-[180px]' : ''}`}>
        {/* Card Body (unchanged) */}
        {/* ...existing content... */}

        {/* Kebab Menu top right */}
        {user && airdrop.user_id === user.id && (
          <div className="absolute top-0 right-0 z-20">
            <KebabMenu onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        )}
        {/* Top: Image/Icon */}
        <div className="flex flex-col items-center">
          {airdrop.media_url ? (
            <img
              src={airdrop.media_url}
              alt={airdrop.project_name || airdrop.name}
              className="w-36 h-36 object-cover rounded-2xl border border-accent2/20 bg-background shadow-xl mb-5"
            />
          ) : (
            <div className="w-36 h-36 flex items-center justify-center bg-accent2/10 rounded-2xl border border-accent2/20 mb-5">
              {icons[airdrop.icon]}
            </div>
          )}
        </div>
        {/* Middle: Info */}
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-2 w-full justify-center text-center">
            <span className="font-extrabold text-2xl md:text-xl sm:text-lg text-white drop-shadow-lg w-full text-center block">{airdrop.project_name || airdrop.name}</span>
          </div>
          <div className="flex flex-nowrap gap-2 text-base w-full items-center overflow-x-auto max-w-full badge-scrollbar pb-6">
            {airdrop.ticker || airdrop.symbol ? (
              <span className="bg-muted/10 text-muted px-4 py-1 rounded-full font-semibold">${airdrop.ticker || airdrop.symbol}</span>
            ) : null}
            {airdrop.blockchain && (
              <span className="bg-accent2/10 text-accent2 px-4 py-1 rounded-full font-semibold">{airdrop.blockchain}</span>
            )}
            {airdrop.cost && (
              <span className="bg-accent/10 text-accent px-4 py-1 rounded-full font-semibold">{airdrop.cost === 'Free' ? 'Free' : 'Paid'}</span>
            )}
            {airdrop.status && (
              <span className={`flex items-center gap-1 px-4 py-1 rounded-full font-bold ${airdrop.status === 'Live' ? 'bg-accent2/20 text-accent2' : 'bg-accent/20 text-accent'}`}>
                <span className="inline-block w-2 h-2 rounded-full bg-current"></span>
                {airdrop.status}
              </span>
            )}
            {airdrop.endsIn && (
              <span className="bg-muted/10 text-muted px-4 py-1 rounded-full">Ends in {airdrop.endsIn}</span>
            )}
            {airdrop.startsIn && (
              <span className="bg-muted/10 text-muted px-4 py-1 rounded-full">Starts in {airdrop.startsIn}</span>
            )}
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-accent2/10 my-3 w-full"></div>
        {/* Bottom: Referral */}
        {airdrop.referral_link && (
          <div className="flex items-center justify-center w-full">
            <a
              href={airdrop.referral_link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent2 text-white py-2 rounded-xl font-bold hover:bg-accent transition-colors text-base shadow-lg w-20 flex justify-center items-center text-center"
            >
              Join
            </a>
          </div>
        )}
      </div>
      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-background border border-accent2/20 rounded-2xl px-7 py-8 w-80 shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-4 text-accent2">Edit Airdrop</h2>
            <input
              className="w-full mb-4 p-3 border border-accent2/15 rounded-xl bg-card text-base text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent2 transition-all"
              value={editData.project_name || ''}
              onChange={e => setEditData({ ...editData, project_name: e.target.value })}
              placeholder="Project Name"
            />
            <input
              className="w-full mb-4 p-3 border border-accent2/15 rounded-xl bg-card text-base text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent2 transition-all"
              value={editData.ticker || ''}
              onChange={e => setEditData({ ...editData, ticker: e.target.value })}
              placeholder="Ticker"
            />
            <select
              className="w-full mb-4 p-3 border border-accent2/15 rounded-xl bg-card text-base text-text focus:outline-none focus:ring-2 focus:ring-accent2 transition-all appearance-none pr-10"
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" stroke="%23b3b8c5" stroke-width="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.25rem 1.25rem'
              }}
              value={editData.blockchain || ''}
              onChange={e => setEditData({ ...editData, blockchain: e.target.value })}
            >
              <option value="">Select Blockchain</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Binance Smart Chain">Binance Smart Chain</option>
              <option value="Solana">Solana</option>
              <option value="Arbitrum">Arbitrum</option>
              <option value="Avalanche">Avalanche</option>
              <option value="Base">Base</option>
              <option value="Ton">Ton</option>
              <option value="Sui">Sui</option>
              <option value="Other">Other</option>
            </select>
            <select
              className="w-full mb-4 p-3 border border-accent2/15 rounded-xl bg-card text-base text-text focus:outline-none focus:ring-2 focus:ring-accent2 transition-all appearance-none pr-10"
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" stroke="%23b3b8c5" stroke-width="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.25rem 1.25rem'
              }}
              value={editData.cost || ''}
              onChange={e => setEditData({ ...editData, cost: e.target.value })}
            >
              <option value="">Select Cost</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
            <input
              className="w-full mb-4 p-3 border border-accent2/15 rounded-xl bg-card text-base text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent2 transition-all"
              value={editData.referral_link || ''}
              onChange={e => setEditData({ ...editData, referral_link: e.target.value })}
              placeholder="Referral Link"
              type="url"
            />
            <div className="flex gap-3 mt-2">
              <button
                className="flex-1 bg-accent2 text-white rounded-xl px-4 py-2 font-bold hover:bg-accent transition-colors"
                onClick={handleEditSave}
              >
                Save
              </button>
              <button
                className="flex-1 bg-card text-muted border border-accent2/10 rounded-xl px-4 py-2 font-bold hover:bg-accent2/10 transition-colors"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-background border border-accent2/20 rounded-2xl px-7 py-8 w-80 shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-2 text-accent2">Delete Airdrop?</h2>
            <p className="mb-5 text-base text-muted">Are you sure you want to delete this airdrop?</p>
            <div className="flex gap-3 mt-2">
              <button
                className="flex-1 bg-accent2 text-white rounded-xl px-4 py-2 font-bold hover:bg-accent transition-colors"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
              <button
                className="flex-1 bg-card text-muted border border-accent2/10 rounded-xl px-4 py-2 font-bold hover:bg-accent2/10 transition-colors"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// KebabMenu component (inline for simplicity)
function KebabMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="absolute top-3 right-3 z-20" ref={menuRef}>
      <button
        className="p-2 rounded-full hover:bg-accent2/10 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open menu"
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="1.5" fill="#888" />
          <circle cx="12" cy="12" r="1.5" fill="#888" />
          <circle cx="12" cy="19" r="1.5" fill="#888" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 mr-[-56px] w-28 bg-background border border-accent2/20 rounded-xl shadow-lg">
          <button className="w-full block text-left px-4 py-2 hover:bg-accent2/10 text-accent2 font-semibold rounded-t-xl" onClick={() => { setOpen(false); if (onEdit) onEdit(); }}>Edit</button>
          <button className="w-full block text-left px-4 py-2 hover:bg-accent/10 text-red-500 font-semibold rounded-b-xl" onClick={() => { setOpen(false); if (onDelete) onDelete(); }}>Delete</button>
        </div>
      )}
    </div>
  );
}





export default AirdropCard;

