import React, { useState, useEffect } from 'react';

const CHECKIN_DAYS = 30;

function getTodayKey() {
  const d = new Date();
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

const DailyCheckin = () => {
  const [progress, setProgress] = useState(0);
  const [lastCheckin, setLastCheckin] = useState(null);
  const [streakBroken, setStreakBroken] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const saved = JSON.parse(localStorage.getItem('daily_checkin') || '{}');
    setProgress(saved.progress || 0);
    setLastCheckin(saved.lastCheckin || null);
    // If last checkin is not today and not null, streak is broken
    if (saved.lastCheckin && saved.lastCheckin !== getTodayKey()) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yKey = yesterday.getFullYear() + '-' + (yesterday.getMonth() + 1) + '-' + yesterday.getDate();
      if (saved.lastCheckin !== yKey) setStreakBroken(true);
    }
  }, []);

  const handleCheckin = () => {
    if (lastCheckin === getTodayKey()) return;
    if (streakBroken) {
      setProgress(1);
      setStreakBroken(false);
    } else {
      setProgress(progress + 1);
    }
    setLastCheckin(getTodayKey());
    localStorage.setItem('daily_checkin', JSON.stringify({
      progress: streakBroken ? 1 : progress + 1,
      lastCheckin: getTodayKey(),
    }));
  };

  const handleReset = () => {
    setProgress(0);
    setLastCheckin(null);
    setStreakBroken(false);
    localStorage.removeItem('daily_checkin');
  };

  return (
    <div className="bg-[#181f33] p-6 rounded-xl shadow-lg max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-[#8bb6f9] flex items-center gap-2">
        <span>Daily Check-in</span>
      </h2>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex gap-2 flex-wrap w-full max-w-2xl justify-center">
          {Array.from({ length: CHECKIN_DAYS }).map((_, idx) => (
            <div
              key={idx}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-bold mr-2 mb-2 transition-all duration-150
                ${idx < progress ? 'bg-[#8bb6f9] border-[#8bb6f9] text-[#181f33]' : 'bg-[#232b47] border-[#232b47] text-[#7a88b8]'}`}
            >
              {idx + 1}
            </div>
          ))}
        </div>
      </div>
      {progress === CHECKIN_DAYS ? (
        <div className="text-green-400 font-semibold text-lg text-center mb-2">🎉 Congrats! You completed 30 days!</div>
      ) : streakBroken ? (
        <div className="text-red-400 font-semibold text-center mb-2">Streak broken! Start again from Day 1.</div>
      ) : null}
      <div className="flex gap-4 justify-center mt-8">
        <button
          className="bg-[#8bb6f9] text-[#181f33] px-10 py-4 rounded-xl font-bold text-xl hover:bg-[#2979f3] disabled:opacity-60 transition-all duration-150"
          onClick={handleCheckin}
          disabled={lastCheckin === getTodayKey() || progress === CHECKIN_DAYS}
        >
          {progress === CHECKIN_DAYS ? 'Completed' : lastCheckin === getTodayKey() ? 'Checked In' : 'Check In Today'}
        </button>
      </div>
    </div>
  );
};

export default DailyCheckin;
