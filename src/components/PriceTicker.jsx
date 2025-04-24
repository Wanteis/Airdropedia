import React, { useEffect, useRef, useState } from 'react';

const COINS = [
  {
    symbol: 'BTCUSDT',
    name: 'BTC',
    logo: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  },
  {
    symbol: 'ETHUSDT',
    name: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  },
  {
    symbol: 'SOLUSDT',
    name: 'SOL',
    logo: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
  },
  {
    symbol: 'BNBUSDT',
    name: 'BNB',
    logo: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png',
  },
  {
    symbol: 'DOGEUSDT',
    name: 'DOGE',
    logo: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
  },
  {
    symbol: 'XRPUSDT',
    name: 'XRP',
    logo: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
  },
  {
    symbol: 'TONUSDT',
    name: 'TON',
    logo: 'https://assets.coingecko.com/coins/images/17980/large/ton_symbol.png',
  },
  {
    symbol: 'ADAUSDT',
    name: 'ADA',
    logo: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
  },
];

const wsUrls = COINS.map(
  c => `wss://stream.binance.com:9443/ws/${c.symbol.toLowerCase()}@trade`
);

function useLivePrices() {
  const [prices, setPrices] = useState({});
  const prevPrices = useRef({});

  useEffect(() => {
    const sockets = wsUrls.map((url, idx) => {
      const ws = new window.WebSocket(url);
      ws.onmessage = event => {
        const { p } = JSON.parse(event.data); // price as string
        setPrices(prices => {
          const floatP = parseFloat(p);
          prevPrices.current[COINS[idx].symbol] = prices[COINS[idx].symbol] || floatP;
          return { ...prices, [COINS[idx].symbol]: floatP };
        });
      };
      return ws;
    });
    return () => sockets.forEach(ws => ws.close());
  }, []);

  return { prices, prevPrices: prevPrices.current };
}

const PriceTicker = () => {
  const { prices, prevPrices } = useLivePrices();

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex items-center gap-8 animate-marquee whitespace-nowrap px-2"
        style={{ minWidth: '100%' }}
      >
        {[...COINS, ...COINS].map((coin, idx) => {
          const price = prices[coin.symbol];
          const prev = prevPrices[coin.symbol];
          let color = 'text-white';
          if (prev !== undefined && price !== undefined) {
            color = price > prev ? 'text-green-400' : price < prev ? 'text-red-400' : 'text-white';
          }
          return (
            <span key={coin.symbol + idx} className="flex items-center gap-2 text-lg font-semibold">
              <img src={coin.logo} alt={coin.name} className="w-6 h-6 rounded-full bg-black" onError={e => { e.target.onerror = null; e.target.style.display='none'; }} />
              <span className={color}>{price ? price.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '--'}</span>
            </span>
          );
        })}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PriceTicker;
