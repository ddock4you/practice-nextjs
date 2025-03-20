// hooks/use-toggle-favorite.ts
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavoriteMovie } from "@/actions/movieAction";
import { toast } from "sonner";

interface UseToggleFavoriteProps {
  id: number;
  title: string;
  initialIsFavorite: boolean;
}

interface UseToggleFavoriteReturn {
  isFavorite: boolean;
  toggleFavoriteMovieMutation: () => void;
  isLoading: boolean;
}

export default function useToggleFavorite({
  id,
  title,
  initialIsFavorite,
}: UseToggleFavoriteProps): UseToggleFavoriteReturn {
  const [isFavorite, setFavorite] = useState(initialIsFavorite);
  // const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => toggleFavoriteMovie(id, initialIsFavorite),
    onSuccess: () => {
      const newState = !isFavorite;
      setFavorite(newState);
      const message = newState
        ? `${title}을 즐겨찾기에 추가했습니다.`
        : `${title}을 즐겨찾기에서 제거했습니다.`;
      toast.success(message);

      // queryClient.invalidateQueries({ queryKey: ["movies"] })
    },
    onError: (error) => {
      toast.error("찜하기 처리 중 오류가 발생했습니다.");
      console.error("찜하기 오류:", error);
    },
  });

  function toggleFavoriteMovieMutation() {
    mutation.mutate();
  }

  return {
    isFavorite,
    toggleFavoriteMovieMutation,
    isLoading: mutation.isPending,
  };
}
