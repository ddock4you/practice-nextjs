"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import MovieCardItem from "./MovieCardItem";
import { searchMovies } from "@/actions/movieAction";
import { Spinner } from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import { searchState } from "@/utils/recoil/atoms";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function MovieCardList() {
  const search = useRecoilValue(searchState);

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["movie", search],
    queryFn: ({ pageParam }) => searchMovies({ search, page: pageParam, pageSize: 12 }),
    getNextPageParam: (lastPage) => (lastPage.page ? lastPage.page + 1 : null),
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    console.log("inView", inView);
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="grid gap-1 md:grid-cols-4 grid-cols-3 w-full h-full">
      {isFetching || (isFetchingNextPage && <Spinner />)}
      <>
        {console.log(data)}
        {console.log(data?.pages.flat())}
        {data?.pages?.map((page) =>
          page.data?.flat().map((movie) => <MovieCardItem key={movie.id} movie={movie} />)
        )}

        <div ref={ref}></div>
      </>
    </div>
  );
}
