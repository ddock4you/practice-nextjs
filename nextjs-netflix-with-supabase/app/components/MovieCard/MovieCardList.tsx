"use client";

import { useQuery } from "@tanstack/react-query";
import MovieCardItem from "./MovieCardItem";
import { searchMovies } from "@/actions/movieAction";
import { Spinner } from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import { searchState } from "@/utils/recoil/atoms";

export default function MovieCardList() {
  const search = useRecoilValue(searchState);

  const getAllMoviesQuery = useQuery({
    queryKey: ["movie", search],
    queryFn: () => searchMovies(search),
  });
  console.log(getAllMoviesQuery);
  return (
    <div className="grid gap-1 md:grid-cols-4 grid-cols-3 w-full h-full">
      {getAllMoviesQuery.isLoading && <Spinner />}
      {getAllMoviesQuery.data?.map((movie) => (
        <MovieCardItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
