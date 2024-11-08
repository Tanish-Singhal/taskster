import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNames = (name: string): string => {
  const trimmedName = name.replace(/\s+/g, ' ').trim();
  return trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1);
};
