import React, { useState, useEffect, useRef } from 'react';
import favicon from '../../public/Favicon.png';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    let start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / 4000) * 100, 100);
      setProgress(percent);
      if (percent >= 100) clearInterval(intervalRef.current);
    }, 16);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-accent2"></div>
    </div>
  );
};

export default Loader;
