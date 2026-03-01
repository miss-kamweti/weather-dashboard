import React from 'react';
import { motion } from 'framer-motion';
import { WiDaySunny } from 'react-icons/wi';
import { FiMoon } from 'react-icons/fi';

const ThemeToggle = ({ darkMode, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className="relative w-16 h-8 rounded-2xl bg-white/10 border border-white/10 p-1 flex items-center transition-colors cursor-pointer"
            aria-label="Toggle theme"
        >
            <motion.div
                animate={{ x: darkMode ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-6 h-6 rounded-xl bg-white shadow-lg flex items-center justify-center relative z-10"
            >
                {darkMode ? (
                    <FiMoon className="text-slate-800 text-xs" />
                ) : (
                    <WiDaySunny className="text-orange-500 text-lg" />
                )}
            </motion.div>
            <div className="absolute inset-0 flex justify-between items-center px-2">
                <WiDaySunny className="text-white/20 text-lg" />
                <FiMoon className="text-white/20 text-xs" />
            </div>
        </button>
    );
};

export default ThemeToggle;
