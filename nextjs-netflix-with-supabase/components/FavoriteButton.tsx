"use client";

import { ButtonHTMLAttributes } from "react";
interface FavoriteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFavorite: boolean;
}

export default function FavoriteButton({
  isFavorite,
  className = "absolute top-2 right-2 z-10 text-lg",
  ...props
}: FavoriteButtonProps) {
  return (
    <button type="button" className={className} {...props}>
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}
