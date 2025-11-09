import React from 'react';
import { motion } from 'framer-motion';
import { Outfit } from '../lib/types';
import { Download, RefreshCw } from 'lucide-react';

interface ResultCardProps {
  outfit: Outfit;
  onTryAgain: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: 'spring' } },
};

const ResultCard: React.FC<ResultCardProps> = ({ outfit, onTryAgain }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = outfit.imageUrl;
    link.download = 'outfit-recommendation.png';
    // To make it work for cross-origin images, we can fetch and create a blob URL, but for unsplash this is simpler.
    // Note: This might be blocked by browser security for cross-origin images.
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl mx-auto grid md:grid-cols-2"
    >
      <div className="relative group">
        <img src={outfit.imageUrl} alt={outfit.description} className="w-full h-full object-cover min-h-[400px] md:min-h-0" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-white/80 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-white transition-colors"
            >
                <Download size={20} />
                Download
            </button>
        </div>
      </div>
      <div className="p-6 md:p-8 flex flex-col justify-between">
        <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Perfect Outfit!</h3>
            <p className="text-gray-600 mb-4">{outfit.description}</p>
            <div className="bg-gray-100 rounded-lg p-3">
                <p className="font-semibold text-gray-700">Color & Style Notes:</p>
                <p className="text-gray-600 text-sm">{outfit.colorPalette}</p>
            </div>
        </div>
        <button
          onClick={onTryAgain}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      </div>
    </motion.div>
  );
};

export default ResultCard;
