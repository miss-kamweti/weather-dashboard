import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiTrash2 } from 'react-icons/fi';

const Favorites = ({ favorites, onSelect, onRemove }) => {
    if (favorites.length === 0) return null;

    return (
        <div className="mt-8 border-t border-white/5 pt-8">
            <h3 className="text-[10px] font-black mb-4 text-white/40 flex items-center gap-2 uppercase tracking-[0.2em]">
                <FiStar className="text-yellow-500" /> Saved_Targets
            </h3>
            <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                    {favorites.map((city) => (
                        <motion.div
                            key={city}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-2 rounded-xl transition-all"
                        >
                            <button
                                onClick={() => onSelect(city)}
                                className="text-[10px] font-bold text-white/70 uppercase tracking-widest"
                            >
                                {city}
                            </button>
                            <button
                                onClick={() => onRemove(city)}
                                className="text-white/20 hover:text-red-400 transition-colors"
                            >
                                <FiTrash2 className="text-xs" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Favorites;
