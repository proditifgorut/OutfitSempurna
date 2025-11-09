import { Question } from './types';

export const questions: Question[] = [
  {
    id: 'mood',
    title: 'How are you feeling today?',
    options: ['Romantic', 'Casual', 'Confident', 'Cheerful', 'Calm'],
  },
  {
    id: 'occasion',
    title: 'What is the occasion?',
    options: ['Party', 'Date', 'Work', 'Outing', 'Formal'],
  },
  {
    id: 'vibe',
    title: 'What style or vibe do you want?',
    options: ['Dreamy', 'Minimalist', 'Vintage', 'Colorful', 'Edgy'],
  },
];
