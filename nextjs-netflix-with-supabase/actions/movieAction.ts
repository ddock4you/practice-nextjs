"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

const handleErrors = (error: Error | null) => {
  if (error) {
    console.error(error);
    throw error;
  }
};

type searchMoviesProps = {
  search: string;
  page: number;
  pageSize: number;
};

export const searchMovies = async ({ search, page, pageSize }: searchMoviesProps) => {
  const supabase = await createServerSupabaseClient();
  const { data, count, error } = await supabase
    .from("movie")
    .select("*")
    .ilike("title", `%${search}%`)
    .order("is_favorite", { ascending: false })
    .order("id", { ascending: true })
    .range((page - 1) * pageSize, page * pageSize - 1);

  handleErrors(error);

  const hasNextPage = count && count > page * pageSize - 1;

  if (error) {
    return {
      data: [],
      count: 0,
      page: null,
      pageSize: null,
      error,
    };
  }

  return {
    data,
    page,
    pageSize,
    hasNextPage,
  };
};

export const getMovie = async (id: number) => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("movie").select("*").eq("id", id).maybeSingle();
  handleErrors(error);

  return data;
};

export const toggleFavoriteMovie = async (id: number, isFavorite: boolean) => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("movie")
    .update({ is_favorite: !isFavorite })
    .eq("id", id);

  handleErrors(error);

  return data;
};
