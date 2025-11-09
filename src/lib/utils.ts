import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Selections } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateOutfitPrompt(selections: Selections): string {
    if (!selections.mood || !selections.occasion || !selections.vibe) {
        return "stylish fashion outfit";
    }
    return `A ${selections.mood.toLowerCase()}, ${selections.vibe.toLowerCase()} outfit for a ${selections.occasion.toLowerCase()} event, fashion photography style, full body shot of a person.`;
}

export function generateOutfitDescription(selections: Selections): { description: string, colorPalette: string } {
    if (!selections.mood || !selections.occasion || !selections.vibe) {
        return { description: "A stylish and modern outfit.", colorPalette: "Neutral tones" };
    }
    
    const descriptions = {
        Romantic: "A flowing dress with soft fabrics",
        Casual: "Comfortable jeans and a stylish top",
        Confident: "A sharp power suit or a bold dress",
        Cheerful: "A brightly colored ensemble with playful accessories",
        Calm: "A relaxed-fit linen set",
    };

    const palettes = {
        Dreamy: "pastels and iridescent touches",
        Minimalist: "monochromatic and neutral tones",
        Vintage: "earth tones and classic patterns",
        Colorful: "bold and vibrant primary colors",
        Edgy: "dark tones with metallic accents",
    }

    const description = `${descriptions[selections.mood]} with a ${selections.vibe.toLowerCase()} twist, perfect for a ${selections.occasion.toLowerCase()}.`;
    const colorPalette = `Featuring ${palettes[selections.vibe]}.`;

    return { description, colorPalette };
}
