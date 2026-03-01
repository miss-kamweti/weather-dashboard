import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 backdrop-blur-md flex items-center gap-4"
        >
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <FiAlertCircle className="text-2xl text-red-500" />
            </div>
            <div>
                <h4 className="font-bold text-red-400 uppercase tracking-widest text-xs">Error Detected</h4>
                <p className="text-red-200 mt-1 font-medium">{message}</p>
            </div>
        </motion.div>
    );
};

export default ErrorMessage;
