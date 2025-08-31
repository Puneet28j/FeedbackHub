import type { Category } from "@/Types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCategoryBadgeColors = (category: Category) => {
  switch (category) {
    case "Bug":
      return "bg-red-100 text-red-800";
    case "Improvement":
      return "bg-blue-100 text-blue-800";
    case "Feature":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const seeMore = (text: string) => {
  if (text.length <= 150) return text;
  return text.slice(0, 150) + "... see more";
};
