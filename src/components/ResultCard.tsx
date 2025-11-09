import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Outfit } from '../lib/types';
import { Download, RefreshCw, Check, AlertCircle } from './icons';
import { cn } from '../lib/utils';

interface ResultCardProps {
  outfit: Outfit;
  onTryAgain: () => void;
}

type DownloadState = 'idle' | 'downloading' | 'success' | 'error';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: 'spring', bounce: 0.4 } },
};

const ResultCard: React.FC<ResultCardProps> = ({ outfit, onTryAgain }) => {
  const [downloadState, setDownloadState] = useState<DownloadState>('idle');

  const handleDownload = async () => {
    setDownloadState('downloading');
    try {
      // Fetch the image from the URL. The 'no-cors' mode is a fallback for restrictive servers.
      const response = await fetch(outfit.imageUrl, { mode: 'no-cors' });
      // Since we can't access the response body in 'no-cors' mode, we have to use a workaround.
      // We'll create a blob from a new fetch that might work via a proxy if available or directly.
      const imageBlob = await (await fetch(outfit.imageUrl)).blob();
      const url = window.URL.createObjectURL(imageBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'outfit-oracle.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setDownloadState('success');
    } catch (error) {
      console.error("Failed to download image automatically:", error);
      setDownloadState('error');
      // As a fallback, open the image in a new tab for the user to save manually.
      window.open(outfit.imageUrl, '_blank');
    } finally {
        setTimeout(() => setDownloadState('idle'), 2000);
    }
  };

  const DownloadButtonContent = () => {
    switch(downloadState) {
        case 'downloading': return <><motion.div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-white" /> Downloading...</>;
        case 'success': return <><Check size={20} /> Success!</>;
        case 'error': return <><AlertCircle size={20} /> Error!</>;
        default: return <><Download size={20} /> Download Image</>;
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl mx-auto md:grid md:grid-cols-5"
    >
      <div className="relative group md:col-span-3">
        <img src={outfit.imageUrl} alt={outfit.description} className="w-full h-full object-cover min-h-[400px] md:min-h-0" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
            <motion.button
                onClick={handleDownload}
                disabled={downloadState !== 'idle'}
                className={cn(
                    "flex items-center justify-center gap-2 w-48 h-12 bg-white/90 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300",
                    downloadState === 'idle' && "hover:bg-white hover:scale-105",
                    downloadState === 'downloading' && "cursor-wait",
                    downloadState === 'success' && "bg-green-500 text-white",
                    downloadState === 'error' && "bg-red-500 text-white"
                )}
                whileTap={downloadState === 'idle' ? { scale: 0.95 } : {}}
            >
                <DownloadButtonContent/>
            </motion.button>
        </div>
      </div>
      <div className="p-6 md:p-8 flex flex-col justify-between md:col-span-2">
        <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">The Oracle has spoken!</h3>
            <p className="text-gray-600 mb-6">{outfit.description}</p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <p className="font-semibold text-indigo-800">Style & Color Palette:</p>
                <p className="text-indigo-700 text-sm">{outfit.colorPalette}</p>
            </div>
        </div>
        <motion.button
          onClick={onTryAgain}
          className="mt-8 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
          whileHover={{ scale: 1.02, backgroundColor: '#4338CA' }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw size={18} />
          Ask Again
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ResultCard;
