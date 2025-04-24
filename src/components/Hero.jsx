import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AirdropFilters from './AirdropFilters';
import PriceTicker from './PriceTicker';

const Hero = ({
  search,
  setSearch,
  blockchain,
  setBlockchain,
  cost,
  setCost,
  sort,
  setSort,
}) => {
  const navigate = useNavigate();
  // fallback local state if not controlled by parent
  const [localSearch, setLocalSearch] = useState('');
  const [localBlockchain, setLocalBlockchain] = useState('All');
  const [localCost, setLocalCost] = useState('All');
  const [localSort, setLocalSort] = useState('latest');

  const searchValue = search !== undefined ? search : localSearch;
  const setSearchValue = setSearch || setLocalSearch;
  const blockchainValue = blockchain !== undefined ? blockchain : localBlockchain;
  const setBlockchainValue = setBlockchain || setLocalBlockchain;
  const costValue = cost !== undefined ? cost : localCost;
  const setCostValue = setCost || setLocalCost;
  const sortValue = sort !== undefined ? sort : localSort;
  const setSortValue = setSort || setLocalSort;

  return (
    <section className="text-center mt-8 sm:mt-6 md:mt-8 lg:mt-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-tight">Discover Crypto Airdrops</h1>
      <p className="text-lg sm:text-xl md:text-lg lg:text-xl text-muted mb-8 sm:mb-6 md:mb-8 lg:mb-10">Your guide to the latest and upcoming crypto airdrops</p>
      <div className="w-full flex flex-col sm:flex-col md:flex-row lg:flex-row gap-4 sm:gap-2 md:gap-4 lg:gap-4 items-center justify-center py-4 sm:py-3 md:py-4 lg:py-5 mb-4 sm:mb-2 md:mb-3 lg:mb-4">
        <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <input
            type="text"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Search airdrops..."
            className="w-full py-4 sm:py-3 md:py-4 lg:py-5 pl-12 pr-4 rounded-xl bg-card text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent2 transition-all border border-transparent focus:border-accent2"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm6.25-1.25L18.5 18.5" stroke="#8CA3C7" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
        </div>
        <AirdropFilters
          blockchain={blockchainValue}
          setBlockchain={setBlockchainValue}
          cost={costValue}
          setCost={setCostValue}
          sort={sortValue}
          setSort={setSortValue}
        />
      </div>
      {/* Price Ticker Marquee */}
      <div className="w-full flex justify-center mb-2">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <PriceTicker />
        </div>
      </div>
    </section>
  );
};

export default Hero;
