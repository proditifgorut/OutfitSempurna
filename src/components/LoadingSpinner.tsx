import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center text-center"
    >
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
      <p className="mt-4 text-xl font-semibold text-gray-700">Finding your perfect look...</p>
      <p className="text-gray-500">The AI is thinking</p>
    </motion.div>
  );
};

export default LoadingSpinner;
