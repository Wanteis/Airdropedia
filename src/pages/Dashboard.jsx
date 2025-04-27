import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import supabase from '../supabaseClient';
import AirdropCard from '../components/AirdropCard';
import {
  DashboardIcon, TasksIcon, PaymentsIcon, QuizIcon, DailyCheckinIcon, QuestsIcon, AnalyticsIcon, SettingsIcon, LogoutIcon
} from '../components/DashboardIcons';
import TodoList from '../components/TodoList';
import Quizzes from '../components/Quizzes';
import DailyCheckin from '../components/DailyCheckin';
import '../components/custom-scrollbar.css';
const Quests = () => (
  <div className="bg-[#181f33] p-6 rounded-xl shadow-lg max-w-xl mx-auto mt-10">
    <h2 className="text-2xl font-bold mb-6 text-[#8bb6f9]">Quests</h2>
    <div className="flex items-center justify-between bg-[#232b47] rounded-xl p-4 mb-4 shadow">
      <div className="flex flex-col items-start">
        <span className="font-semibold text-lg text-white mb-1">1. Follow us on X</span>
        <span className="text-[#b4bcd0] text-sm">Stay updated with the latest news and airdrops!</span>
      </div>
      <a
        href="https://www.x.com/Airdropediaxyz"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 bg-[#8bb6f9] hover:bg-[#2979f3] text-[#181f33] font-bold px-6 py-2 rounded-lg transition"
      >
        Visit
      </a>
    </div>
    <div className="flex items-center justify-between bg-[#232b47] rounded-xl p-4 mb-4 shadow">
      <div className="flex flex-col items-start">
        <span className="font-semibold text-lg text-white mb-1">2. Follow our Founder</span>
        <span className="text-[#b4bcd0] text-sm">Support Wanxeii, the founder of Airdropedia!</span>
      </div>
      <a
        href="https://www.x.com/Wanxeii"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 bg-[#8bb6f9] hover:bg-[#2979f3] text-[#181f33] font-bold px-6 py-2 rounded-lg transition"
      >
        Visit
      </a>
    </div>
    <div className="flex items-center justify-between bg-[#232b47] rounded-xl p-4 mb-4 shadow">
      <div className="flex flex-col items-start">
        <span className="font-semibold text-lg text-white mb-1">3. Like and Retweet this post</span>
        <span className="text-[#b4bcd0] text-sm">Help us grow by engaging with our latest announcement!</span>
      </div>
      <a
        href="https://x.com/Airdropediaxyz/status/1916392681489547615"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 bg-[#8bb6f9] hover:bg-[#2979f3] text-[#181f33] font-bold px-6 py-2 rounded-lg transition"
      >
        Visit
      </a>
    </div>
    <div className="flex items-center justify-between bg-[#232b47] rounded-xl p-4 mb-4 shadow">
      <div className="flex flex-col items-start">
        <span className="font-semibold text-lg text-white mb-1">4. Like and Retweet this post</span>
        <span className="text-[#b4bcd0] text-sm">Support our campaign by engaging with this post!</span>
      </div>
      <a
        href="https://x.com/Airdropediaxyz/status/1916365262955151544"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 bg-[#8bb6f9] hover:bg-[#2979f3] text-[#181f33] font-bold px-6 py-2 rounded-lg transition"
      >
        Visit
      </a>
    </div>
  </div>
);


const Dashboard = () => {
  const { user } = useAuth();
  const [favAirdrops, setFavAirdrops] = useState([]);
  const [allAirdrops, setAllAirdrops] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [section, setSection] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedToRemove, setSelectedToRemove] = useState([]);

  // Fetch all airdrops for the add modal
  useEffect(() => {
    const fetchAirdrops = async () => {
      const { data } = await supabase.from('airdrops').select('*');
      setAllAirdrops(data || []);
    };
    fetchAirdrops();
  }, []);

  // Fetch user's favorite/imported airdrops
  useEffect(() => {
    if (!user) return;
    const fetchFavs = async () => {
      const { data } = await supabase
        .from('user_favorites')
        .select('airdrop_id, airdrops(*)')
        .eq('user_id', user.id);
      setFavAirdrops((data || []).map(row => row.airdrops));
    };
    fetchFavs();
  }, [user]);

  const handleAddAirdrop = async (airdropId) => {
    if (!user) return;
    console.log('user.id:', user.id, 'airdropId:', airdropId);
    const { error } = await supabase.from('user_favorites').insert({ user_id: user.id, airdrop_id: airdropId });
    if (error) {
      alert('Insert error: ' + error.message);
      console.error(error);
      return;
    }
    setFavAirdrops(prev => [allAirdrops.find(a => a.id === airdropId), ...prev]);
    setShowAddModal(false);
  };

  const handleRemoveAirdrop = async (airdropId) => {
    if (!user) return;
    await supabase.from('user_favorites').delete().eq('user_id', user.id).eq('airdrop_id', airdropId);
    setFavAirdrops(prev => prev.filter(a => a.id !== airdropId));
  };

  if (!user) {
    return <div className="max-w-2xl mx-auto mt-20 text-center text-lg">Please log in to access your dashboard.</div>;
  }

  return (
    <div className="bg-[#151a2b] flex flex-col md:flex-row min-h-screen w-full">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1b2236] border-r border-[#232b47] p-6 gap-6 shadow-lg min-h-screen">
        {/* Desktop Sidebar */}
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-accent2 rounded-lg p-2">
            <DashboardIcon className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-extrabold tracking-wide ml-2 text-white">Airdropedia</span>
        </div>
        <div className="text-xs font-bold text-[#6b7280] mb-1 mt-2">BOARDS</div>
        <nav className="flex flex-col gap-2">
          <a href="#" className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[#b4bcd0] hover:bg-[#232b47] hover:text-white transition ${section === 'dashboard' ? 'bg-accent2/10 text-accent2 font-semibold' : ''}`} onClick={() => setSection('dashboard')}><DashboardIcon className="w-5 h-5" /><span>Dashboard</span></a>
          <a href="#" className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[#b4bcd0] hover:bg-[#232b47] hover:text-white transition ${section === 'tasks' ? 'bg-accent2/10 text-accent2 font-semibold' : ''}`} onClick={() => setSection('tasks')}><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor"/><path d="M9 4V2h6v2" stroke="currentColor"/><circle cx="8" cy="9" r="1" fill="currentColor"/><circle cx="8" cy="13" r="1" fill="currentColor"/><circle cx="8" cy="17" r="1" fill="currentColor"/><path d="M11 9h5M11 13h5M11 17h5" stroke="currentColor" strokeLinecap="round"/></svg><span>Tasks</span></a>
          <a href="#" className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[#b4bcd0] hover:bg-[#232b47] hover:text-white transition ${section === 'quizzes' ? 'bg-accent2/10 text-accent2 font-semibold' : ''}`} onClick={() => setSection('quizzes')}><QuizIcon className="w-5 h-5" /><span>Quizzes</span></a>
          <a href="#" className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[#b4bcd0] hover:bg-[#232b47] hover:text-white transition ${section === 'checkin' ? 'bg-accent2/10 text-accent2 font-semibold' : ''}`} onClick={() => setSection('checkin')}><DailyCheckinIcon className="w-5 h-5" /><span>Daily Check-in</span></a>
          <a href="#" className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[#b4bcd0] hover:bg-[#232b47] hover:text-white transition ${section === 'quests' ? 'bg-accent2/10 text-accent2 font-semibold' : ''}`} onClick={() => setSection('quests')}><QuestsIcon className="w-5 h-5" /><span>Quests</span></a>
          <div className="flex-1" />
        </nav>
      </aside>
      {/* Mobile Topbar */}
      <nav className="flex md:hidden flex-row w-full bg-[#1b2236] border-b border-[#232b47] px-2 py-2 gap-1 shadow-lg sticky top-0 z-30 overflow-x-auto">
        <a href="#" className={`flex flex-col items-center px-2 py-1 rounded-lg text-xs ${section === 'dashboard' ? 'bg-accent2/10 text-accent2 font-semibold' : 'text-[#b4bcd0]'}`} onClick={() => setSection('dashboard')}><DashboardIcon className="w-5 h-5" /><span>Dashboard</span></a>
        <a href="#" className={`flex flex-col items-center px-2 py-1 rounded-lg text-xs ${section === 'tasks' ? 'bg-accent2/10 text-accent2 font-semibold' : 'text-[#b4bcd0]'}`} onClick={() => setSection('tasks')}><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor"/><path d="M9 4V2h6v2" stroke="currentColor"/><circle cx="8" cy="9" r="1" fill="currentColor"/><circle cx="8" cy="13" r="1" fill="currentColor"/><circle cx="8" cy="17" r="1" fill="currentColor"/><path d="M11 9h5M11 13h5M11 17h5" stroke="currentColor" strokeLinecap="round"/></svg><span>Tasks</span></a>
        <a href="#" className={`flex flex-col items-center px-2 py-1 rounded-lg text-xs ${section === 'quizzes' ? 'bg-accent2/10 text-accent2 font-semibold' : 'text-[#b4bcd0]'}`} onClick={() => setSection('quizzes')}><QuizIcon className="w-5 h-5" /><span>Quizzes</span></a>
        <a href="#" className={`flex flex-col items-center px-2 py-1 rounded-lg text-xs ${section === 'checkin' ? 'bg-accent2/10 text-accent2 font-semibold' : 'text-[#b4bcd0]'}`} onClick={() => setSection('checkin')}><DailyCheckinIcon className="w-5 h-5" /><span>Check-in</span></a>
        <a href="#" className={`flex flex-col items-center px-2 py-1 rounded-lg text-xs ${section === 'quests' ? 'bg-accent2/10 text-accent2 font-semibold' : 'text-[#b4bcd0]'}`} onClick={() => setSection('quests')}><QuestsIcon className="w-5 h-5" /><span>Quests</span></a>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-col min-h-0 h-full w-full">
        {/* Topbar */}
        <header className="flex items-center justify-center px-6 py-4 bg-[#181f33] border-b border-[#232b47] w-full">
          <div className="flex items-center gap-6 max-w-md w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg border border-[#232b47] px-4 py-2 bg-[#232b47] focus:outline-none focus:ring-2 focus:ring-accent2 text-base text-white placeholder:text-[#7a88b8]"
              // For now, not wired to search
            />
          </div>
          <button
            className="bg-accent2 text-white px-3 py-1.5 rounded-lg font-bold shadow hover:bg-accent transition text-lg w-8 h-8 flex items-center justify-center ml-4"
            style={{lineHeight:1.2, boxShadow:'0 2px 8px 0 #00E1FF22'}}
            onClick={() => setShowAddModal(true)}
            aria-label="Add Airdrop"
          >
            +
          </button>
        </header>
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto min-h-0 w-full">
          {section === 'dashboard' ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-[#8bb6f9]">My Favorite Airdrops</h1>
                {favAirdrops.length > 0 && (
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-lg shadow transition"
                    onClick={() => setShowRemoveModal(true)}
                  >
                    Remove
                  </button>
                )}
              </div>
              {favAirdrops.length === 0 ? (
                <div className="text-[#b4bcd0] text-lg mt-12">No airdrops added yet. Use the + Add button to import your favorites!</div>
              ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {favAirdrops.map((airdrop) => (
                    <AirdropCard
                      key={airdrop.id}
                      airdrop={airdrop}
                      onRemove={handleRemoveAirdrop}
                      isFavorite={true}
                    />
                  ))}
                </div>
              )}
            </>
          ) : section === 'tasks' ? (
            <TodoList />
          ) : section === 'quizzes' ? (
            <Quizzes />
          ) : section === 'checkin' ? (
            <DailyCheckin />
          ) : section === 'quests' ? (
            <Quests />
          ) : null}
        </main>
      </div>
      {/* Remove Modal */}
      {showRemoveModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[#232b47] border border-red-600/30 rounded-2xl px-2 sm:px-7 py-6 sm:py-8 w-full max-w-full sm:max-w-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-[#8bb6f9]">Remove Airdrop</h2>
            <div className="max-h-64 overflow-y-auto custom-scrollbar mb-4">
              {favAirdrops.length === 0 ? (
                <div className="text-[#b4bcd0] text-lg mt-8">No airdrops to remove.</div>
              ) : (
                favAirdrops.map(a => (
                  <label key={a.id} className="flex items-center gap-3 py-2 border-b border-accent2/10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedToRemove.includes(a.id)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedToRemove([...selectedToRemove, a.id]);
                        } else {
                          setSelectedToRemove(selectedToRemove.filter(id => id !== a.id));
                        }
                      }}
                      className="accent-[#8bb6f9] w-5 h-5"
                    />
                    <span className="font-semibold text-white text-base">{a.project_name || a.name}</span>
                  </label>
                ))
              )}
            </div>
            <div className="flex gap-4 justify-end mt-6">
              <button
                className="bg-[#232b47] text-[#b4bcd0] px-4 py-2 rounded-lg font-bold hover:bg-accent2/10 hover:text-accent2 border border-accent2/20 transition-colors"
                onClick={() => { setShowRemoveModal(false); setSelectedToRemove([]); }}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg shadow disabled:opacity-60"
                disabled={selectedToRemove.length === 0}
                onClick={async () => {
                  for (const id of selectedToRemove) {
                    await handleRemoveAirdrop(id);
                  }
                  setShowRemoveModal(false);
                  setSelectedToRemove([]);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[#232b47] border border-accent2/20 rounded-2xl px-2 sm:px-7 py-6 sm:py-8 w-full max-w-full sm:max-w-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-accent2">Import Airdrop</h2>
            <input
              className="w-full mb-4 p-3 border border-accent2/15 rounded-xl bg-[#181f33] text-base text-white placeholder:text-[#7a88b8] focus:outline-none focus:ring-2 focus:ring-accent2 transition-all"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search airdrops..."
            />
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              {allAirdrops.filter(a =>
                a.project_name?.toLowerCase().includes(search.toLowerCase()) ||
                a.ticker?.toLowerCase().includes(search.toLowerCase())
              ).map(a => (
                <div key={a.id} className="flex items-center justify-between py-2 border-b border-accent2/10">
                  <div className="font-semibold text-white">{a.project_name || a.name}</div>
                  <button
                    className="bg-accent2 text-white px-4 py-1 rounded-lg font-semibold hover:bg-accent transition"
                    onClick={() => handleAddAirdrop(a.id)}
                  >Import</button>
                </div>
              ))}
            </div>
            <button
              className="mt-6 w-full bg-[#181f33] text-accent2 border border-accent2/20 rounded-xl px-4 py-2 font-bold hover:bg-accent2/10 transition-colors"
              onClick={() => setShowAddModal(false)}
            >Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
