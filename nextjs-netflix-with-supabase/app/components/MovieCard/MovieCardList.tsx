"use client";

import MovieCardItem from "./MovieCardItem";

export default function MovieCardList() {
  return (
    <div className="grid gap-1 md:grid-cols-4 grid-cols-3 w-full h-full">
      <MovieCardItem />
      <MovieCardItem />
      <MovieCardItem />
      <MovieCardItem />
    </div>
  );
}
