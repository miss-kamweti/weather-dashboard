import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCode } from 'react-icons/fi';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center p-12">
            <div className="relative w-20 h-20 mb-6">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-[#00f2ff]/30 rounded-full"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 border-2 border-dashed border-[#00f2ff]/10 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center neon-blue text-2xl">
                    <FiCode className="animate-pulse" />
                </div>
            </div>
            <p className="data-label animate-pulse">Deciphering_Atmospheric_Stream...</p>
            <div className="w-48 h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1/2 h-full bg-[#00f2ff] opacity-50"
                />
            </div>
        </div>
    );
};

export default LoadingSpinner;
