import React, { useState } from "react";

const SOL_ADDRESS = "2q7yqu46y3vj4iNAFn12zhYgSefUAyTXwgTWTBZsSFs3";

const Donate = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SOL_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center pt-16 pb-10 sm:pt-8 sm:pb-6">
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center">
        <div className="w-full bg-card rounded-2xl shadow-card p-6 sm:p-3 flex flex-col gap-4 border border-accent2/20 items-center">
          <h2 className="text-xl font-bold mb-1 text-center">Support Airdropedia</h2>
          <p className="text-muted text-center mb-4">
            If you find Airdropedia useful, consider donating <span className="font-semibold text-accent2">Solana (SOL)</span> to help support the project!
          </p>
          <div className="bg-background rounded-lg border border-accent2/30 px-4 py-3 flex flex-col items-center w-full">
            <span className="text-xs text-muted mb-2">Solana Address</span>
            <span className="font-mono text-base text-accent2 break-all text-center select-all">{SOL_ADDRESS}</span>
          </div>
          <button
            className="mt-4 bg-accent2 text-white font-semibold py-3 px-6 rounded-lg hover:bg-accent transition-colors shadow-md"
            onClick={handleCopy}
          >
            {copied ? "Copied" : "Copy Address"}
          </button>
          <p className="text-xs text-muted text-center mt-2">Thank you for your support!</p>
        </div>
      </div>
    </div>
  );
};

export default Donate;
