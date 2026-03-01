import React from 'react';
import { motion } from 'framer-motion';

const UnitToggle = ({ unit, onToggle }) => {
    return (
        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
            <button
                onClick={() => onToggle('metric')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${unit === 'metric'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-white/40 hover:text-white/60'
                    }`}
            >
                °C
            </button>
            <button
                onClick={() => onToggle('imperial')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${unit === 'imperial'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-white/40 hover:text-white/60'
                    }`}
            >
                °F
            </button>
        </div>
    );
};

export default UnitToggle;
