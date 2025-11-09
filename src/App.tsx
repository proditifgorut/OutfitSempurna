import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { questions } from './lib/data';
import { Selections, Outfit } from './lib/types';
import { cn, generateOutfitPrompt, generateOutfitDescription } from './lib/utils';
import QuestionCard from './components/QuestionCard';
import LoadingSpinner from './components/LoadingSpinner';
import ResultCard from './components/ResultCard';

type AppState = 'questioning' | 'loading' | 'result';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [appState, setAppState] = useState<AppState>('questioning');
  const [selections, setSelections] = useState<Selections>({
    mood: null,
    occasion: null,
    vibe: null,
  });
  const [outfit, setOutfit] = useState<Outfit | null>(null);

  const handleSelect = (value: any) => {
    const currentQuestion = questions[currentStep];
    const newSelections = { ...selections, [currentQuestion.id]: value };
    setSelections(newSelections);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setAppState('loading');
      // Simulate AI thinking process
      setTimeout(() => {
        const prompt = generateOutfitPrompt(newSelections);
        const { description, colorPalette } = generateOutfitDescription(newSelections);
        const newOutfit: Outfit = {
          // Using Unsplash as a placeholder for an AI image generator
          // The prompt is URL-encoded to handle spaces and special characters
          imageUrl: `https://source.unsplash.com/800x1200/?${encodeURIComponent(prompt)}`,
          description,
          colorPalette
        };
        setOutfit(newOutfit);
        setAppState('result');
      }, 3000);
    }
  };

  const handleTryAgain = () => {
    setAppState('questioning');
    setCurrentStep(0);
    setSelections({ mood: null, occasion: null, vibe: null });
    setOutfit(null);
  };

  const backgroundClass = useMemo(() => {
    if (selections.mood) {
      return `bg-mood-${selections.mood.toLowerCase()}`;
    }
    return 'bg-gray-100';
  }, [selections.mood]);

  return (
    <main className={cn('min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-1000', backgroundClass)}>
      <AnimatePresence mode="wait">
        {appState === 'questioning' && (
          <QuestionCard
            key={currentStep}
            question={questions[currentStep]}
            onSelect={handleSelect}
          />
        )}
        {appState === 'loading' && <LoadingSpinner />}
        {appState === 'result' && outfit && (
          <ResultCard outfit={outfit} onTryAgain={handleTryAgain} />
        )}
      </AnimatePresence>
      <footer className="absolute bottom-4 text-center w-full text-gray-500 text-sm">
        <p>Powered by Dualite Alpha &copy; 2025</p>
      </footer>
    </main>
  );
}

export default App;
