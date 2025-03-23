"use client";

import Image from "next/image";
import Link from "next/link";
import { Database } from "@/types_db";
import FavoriteButton from "../FavoriteButton";
import useToggleFavorite from "@/hooks/useToggleFavorite";

type Movie = Database["public"]["Tables"]["movie"]["Row"];

export default function MovieCardItem({
  movie: { id, image_url, title, overview, popularity, release_date, vote_average, is_favorite },
}: {
  movie: Movie;
}) {
  const { isFavorite, toggleFavoriteMovieMutation, isLoading } = useToggleFavorite({
    id,
    title,
    initialIsFavorite: is_favorite,
  });

  return (
    <div className="relative w-full aspect-[2/3]">
      <Image
        src={image_url}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <Link href={`/movies/${id}`}>
        <div className="flex items-center justify-center absolute inset-0 z-10 bg-black opacity-0 transition-opacity duration-300 hover:opacity-80">
          <p className="text-xl font-bold text-white">{title}</p>
        </div>
      </Link>
      <FavoriteButton
        onClick={toggleFavoriteMovieMutation}
        isFavorite={isFavorite}
        disabled={isLoading}
      />
    </div>
  );
}
