"use client";

import { ButtonHTMLAttributes } from "react";

interface FavoriteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFavorite: boolean;
}

export default function FavoriteButton({
  isFavorite,
  className = "absolute bottom-2 right-2 z-10 text-lg",
  ...props
}: FavoriteButtonProps) {
  console.log("isFavoriteButton", isFavorite);
  return (
    <button type="button" className={className} {...props}>
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}
