import React from 'react';
import { motion } from 'framer-motion';

const RecentSearches = ({ searches, onSelect }) => {
    if (searches.length === 0) return (
        <p className="text-[10px] font-mono text-white/10 uppercase italic">Memory Cache Empty</p>
    );

    return (
        <div className="flex flex-wrap gap-2">
            {searches.map((city, index) => (
                <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect(city)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-[10px] font-bold text-white/40 hover:text-[#00f2ff] transition-all uppercase tracking-widest font-['Fira_Code']"
                >
                    {city}
                </motion.button>
            ))}
        </div>
    );
};

export default RecentSearches;
