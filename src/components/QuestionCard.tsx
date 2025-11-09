import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../lib/types';

interface QuestionCardProps {
  question: Question;
  onSelect: (value: any) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
};

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSelect }) => {
  return (
    <motion.div
      key={question.id}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">{question.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className="col-span-1 text-sm md:text-base font-medium text-gray-700 bg-white/70 rounded-lg py-3 px-2 shadow-sm border border-gray-200 hover:bg-indigo-500 hover:text-white hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
