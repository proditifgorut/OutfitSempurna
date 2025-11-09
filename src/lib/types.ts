export type Mood = 'Romantic' | 'Casual' | 'Confident' | 'Cheerful' | 'Calm';
export type Occasion = 'Party' | 'Date' | 'Work' | 'Outing' | 'Formal';
export type Vibe = 'Dreamy' | 'Minimalist' | 'Vintage' | 'Colorful' | 'Edgy';

export interface Question {
  id: 'mood' | 'occasion' | 'vibe';
  title: string;
  options: (Mood | Occasion | Vibe)[];
}

export interface Selections {
  mood: Mood | null;
  occasion: Occasion | null;
  vibe: Vibe | null;
}

export interface Outfit {
  imageUrl: string;
  description: string;
  colorPalette: string;
}
