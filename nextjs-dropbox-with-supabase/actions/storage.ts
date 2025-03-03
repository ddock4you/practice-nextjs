"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

const handleError = (error: Error) => {
  if (!error) return;
  throw new Error(`[storage] ${error.message}`);
};

export async function uploadFile(formData: FormData) {
  try {
    const supabase = await createServerSupabaseClient();
    const file = formData.get("file") as File;
    const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET;

    if (!file) throw new Error("No file provided");
    if (!bucketName) throw new Error("Storage bucket name is not configured");

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(file.name, file, { upsert: true });

    handleError(error as Error);

    return data;
  } catch (error) {
    handleError(error as Error);
  }
}

export async function searchFiles(search = "") {
  try {
    const supabase = await createServerSupabaseClient();
    const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET;

    if (!bucketName) throw new Error("Storage bucket name is not configured");

    const { data, error } = await supabase.storage.from(bucketName).list(undefined, { search });

    handleError(error as Error);

    return data;
  } catch (error) {
    handleError(error as Error);
  }
}
