import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: 'easeIn' } },
};

const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }
}

const LoadingSpinner: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center text-center space-y-4"
    >
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <motion.div 
            className="absolute inset-0 border-4 border-t-indigo-500 border-l-indigo-500 border-b-transparent border-r-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.div variants={textVariants}>
        <p className="text-xl font-semibold text-gray-800">Crafting your perfect look...</p>
        <p className="text-gray-500">The Oracle is thinking</p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;
