"use server";

import { createServerSupabaseClient } from "../utils/supabase/server";

const handleErrors = (error: Error | null) => {
  if (error) {
    console.error(error);
    throw error;
  }
};

export const searchMovies = async (search = "") => {
  console.log("search", search);
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("movie").select("*").ilike("title", `%${search}%`);
  handleErrors(error);

  return data;
};

export const getMovie = async (id: number) => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("movie").select("*").eq("id", id).maybeSingle();
  handleErrors(error);

  return data;
};
