import React from 'react';
import { motion } from 'framer-motion';
import { Question, Mood, Occasion, Vibe } from '../lib/types';

interface QuestionCardProps {
  question: Question;
  onSelect: (value: Mood | Occasion | Vibe) => void;
  progress: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
};

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSelect, progress }) => {
  return (
    <motion.div
      key={question.id}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-lg mx-auto"
    >
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <motion.div 
                className="bg-indigo-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center">{question.title}</h2>
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option) => (
            <motion.button
              key={option}
              onClick={() => onSelect(option)}
              className="col-span-1 text-base font-medium text-gray-700 bg-white rounded-lg py-4 px-2 shadow-sm border border-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              whileHover={{ scale: 1.05, backgroundColor: '#EEF2FF', borderColor: '#6366F1' }}
              whileTap={{ scale: 0.95 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
