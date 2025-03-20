"use client";

import Image from "next/image";
import Link from "next/link";
import { Database } from "@/types_db";
import { useMutation } from "@tanstack/react-query";
import { toggleFavoriteMovie } from "@/actions/movieAction";
import { useState } from "react";
import { toast } from "sonner";

type Movie = Database["public"]["Tables"]["movie"]["Row"];

export default function MovieCardItem({
  movie: { id, image_url, title, overview, popularity, release_date, vote_average, is_favorite },
}: {
  movie: Movie;
}) {
  const [isFavorite, setFavorite] = useState(is_favorite);
  // 메시지 정의 지점과 상태 업데이트의 시점의 차이로 인해 메시지 표현 조건을 반대로 설정
  const favoriteSuccessMessage = !isFavorite
    ? `${title}을 즐겨찾기에 추가했습니다.`
    : `${title}을 즐겨찾기에서 제거했습니다.`;
  const toggleFavortieMovieMutation = useMutation({
    mutationFn: () => toggleFavoriteMovie(id, is_favorite),
    onSuccess: () => {
      setFavorite(!isFavorite);
      toast.success(favoriteSuccessMessage);
    },
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
      <button
        type="button"
        className="absolute bottom-2 right-2 z-10 text-lg"
        onClick={() => toggleFavortieMovieMutation.mutate()}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
