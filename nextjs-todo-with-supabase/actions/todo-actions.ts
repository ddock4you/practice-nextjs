"use server";

import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type Row = Database["public"]["Tables"]["todo"]["Row"];
export type Insert = Database["public"]["Tables"]["todo"]["Insert"];
export type Update = Database["public"]["Tables"]["todo"]["Update"];

function handleError(error: Error) {
  console.error(error.message);
  throw new Error(error.message);
}

export async function getTodos({ searchInput = "" }): Promise<Row[] | undefined> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("todo")
    .select("*")
    .like("title", `%${searchInput}%`)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error.message);
    handleError(error);
  }

  return data;
}

export async function createTodo(todo: Insert): Promise<Insert | undefined> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("todo").insert({
    ...todo,
    created_at: new Date().toISOString(),
  });

  if (error) {
    handleError(error);
  }

  return data;
}

export async function updateTodo(todo: Update): Promise<Update | undefined> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("todo")
    .update({ ...todo, updated_at: new Date().toISOString() })
    .eq("id", todo.id);

  if (error) {
    handleError(error);
  }

  return data;
}

export async function deleteTodo(id: number) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("todo").delete().eq("id", id);

  if (error) {
    handleError(error);
  }

  return data;
}
