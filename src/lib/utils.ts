import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Selections } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateOutfitPrompt(selections: Selections): string {
    if (!selections.mood || !selections.occasion || !selections.vibe) {
        return "stylish fashion outfit full body";
    }
    return `photo of a person's full body, wearing a ${selections.mood.toLowerCase()} ${selections.vibe.toLowerCase()} outfit for a ${selections.occasion.toLowerCase()}, high fashion photography, clean background`;
}

export function generateOutfitDescription(selections: Selections): { description: string, colorPalette: string } {
    if (!selections.mood || !selections.occasion || !selections.vibe) {
        return { description: "A stylish and modern outfit, perfect for making a statement.", colorPalette: "Versatile neutral tones." };
    }
    
    const descriptions = {
        Romantic: "A flowing, soft-fabric dress or elegant separates",
        Casual: "Comfortable, stylish jeans paired with a chic top or knitwear",
        Confident: "A sharp power suit, a bold tailored dress, or structured pieces",
        Cheerful: "A brightly colored ensemble featuring playful patterns and accessories",
        Calm: "A relaxed-fit linen set, or an outfit with soft, natural tones and textures",
    };

    const palettes = {
        Dreamy: "soft pastels, iridescent sheens, and delicate, light tones",
        Minimalist: "a clean monochromatic look or a palette of muted, neutral tones",
        Vintage: "rich earth tones, classic patterns like plaid or florals, and retro-inspired hues",
        Colorful: "a vibrant mix of bold primary colors and eye-catching combinations",
        Edgy: "a base of dark tones like black and charcoal, accented with metallics or a pop of intense color",
    }

    const occasionText = {
        Party: "to stand out at your party",
        Date: "for your special date",
        Work: "for a professional yet stylish look at work",
        Outing: "for a fashionable day out",
        Formal: "to look impeccable at your formal event",
    }

    const description = `${descriptions[selections.mood]} with a ${selections.vibe.toLowerCase()} twist, perfect ${occasionText[selections.occasion]}.`;
    const colorPalette = `Featuring ${palettes[selections.vibe]}.`;

    return { description, colorPalette };
}
