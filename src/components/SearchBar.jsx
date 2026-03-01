import React, { useState } from 'react';
import { FiSearch, FiTerminal, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-[#00f2ff] transition-colors">
        <FiTerminal className="text-sm" />
      </div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="INPUT_TARGET_LOCATION..."
        className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-12 pr-12 focus:outline-none focus:border-[#00f2ff]/50 focus:ring-1 focus:ring-[#00f2ff]/50 text-white font-['Fira_Code'] text-xs tracking-widest placeholder:text-white/10 transition-all uppercase"
      />
      <button
        type="submit"
        disabled={loading}
        className="absolute inset-y-2 right-2 px-4 bg-[#00f2ff]/10 hover:bg-[#00f2ff]/20 text-[#00f2ff] rounded-lg border border-[#00f2ff]/20 transition-all flex items-center gap-2 group/btn"
      >
        <span className="text-[10px] font-black tracking-widest uppercase md:block hidden">Execute</span>
        <FiChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </form>
  );
};

export default SearchBar;
