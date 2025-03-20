"use client";

import Image from "next/image";
import { Database } from "@/types_db";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toggleFavoriteMovie } from "@/actions/movieAction";
import { toast } from "sonner";
import FavoriteButton from "../components/FavoriteButton";
import useToggleFavorite from "@/hooks/useToggleFavorite";

type Movie = Database["public"]["Tables"]["movie"]["Row"];

export default function MovieDetail({
  movie: { id, image_url, overview, popularity, release_date, title, vote_average, is_favorite },
}: {
  movie: Movie;
}) {
  const { isFavorite, toggleFavoriteMovieMutation, isLoading } = useToggleFavorite({
    id,
    title,
    initialIsFavorite: is_favorite,
  });

  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="relative aspect-[2/3] w-1/3">
        <Image src={image_url} alt={title} fill />
        <FavoriteButton
          onClick={toggleFavoriteMovieMutation}
          isFavorite={isFavorite}
          disabled={isLoading}
        />
      </div>
      <div className="w-2/3 flex flex-col p-6 gap-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-lg font-medium">{overview}</p>
        <div className="font-bold text-lg">
          <i className="fas fa-star mr-1" /> Vote Average: {vote_average}
        </div>
        <div className="font-bold text-lg">Popularity: {popularity}</div>
        <div className="font-bold text-lg">Release Date: {release_date}</div>
      </div>
    </div>
  );
}
