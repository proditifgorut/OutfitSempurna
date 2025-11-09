import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { questions } from './lib/data';
import { Selections, Outfit, Mood, Occasion, Vibe } from './lib/types';
import { cn, generateOutfitPrompt, generateOutfitDescription } from './lib/utils';
import Header from './components/Header';
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

  const handleSelect = (value: Mood | Occasion | Vibe) => {
    const currentQuestion = questions[currentStep];
    const newSelections = { ...selections, [currentQuestion.id]: value };
    setSelections(newSelections);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setAppState('loading');
      setTimeout(() => {
        const prompt = generateOutfitPrompt(newSelections);
        const { description, colorPalette } = generateOutfitDescription(newSelections);
        const newOutfit: Outfit = {
          imageUrl: `https://source.unsplash.com/800x1200/?${encodeURIComponent(prompt)}`,
          description,
          colorPalette
        };
        setOutfit(newOutfit);
        setAppState('result');
      }, 3500);
    }
  };

  const handleTryAgain = () => {
    setAppState('questioning');
    setCurrentStep(0);
    setSelections({ mood: null, occasion: null, vibe: null });
    setOutfit(null);
  };

  const backgroundClass = useMemo(() => {
    if (appState !== 'questioning' || !selections.mood) {
      return 'bg-gray-50';
    }
    return `bg-mood-${selections.mood.toLowerCase()}`;
  }, [selections.mood, appState]);

  return (
    <div className={cn('min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-1000', backgroundClass)}>
      <Header />
      <main className="flex-grow flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {appState === 'questioning' && (
            <QuestionCard
              key={currentStep}
              question={questions[currentStep]}
              onSelect={handleSelect}
              progress={(currentStep + 1) / questions.length}
            />
          )}
          {appState === 'loading' && <LoadingSpinner />}
          {appState === 'result' && outfit && (
            <ResultCard outfit={outfit} onTryAgain={handleTryAgain} />
          )}
        </AnimatePresence>
      </main>
      <footer className="w-full text-center py-4 text-gray-500 text-sm">
        <p>Powered by Dualite Alpha &copy; 2025</p>
      </footer>
    </div>
  );
}

export default App;
