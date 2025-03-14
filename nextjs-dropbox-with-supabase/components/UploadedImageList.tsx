"use client";

import { useQuery } from "@tanstack/react-query";
import UploadedImage from "./UploadedImage";
import { searchFiles } from "@/actions/storage";
import { Spinner } from "@material-tailwind/react";

export default function UploadedImageList({ searchInput }: { searchInput: string }) {
  const searchImageQuery = useQuery({
    queryKey: ["images", searchInput],
    queryFn: () => searchFiles(searchInput),
  });
  console.log(searchImageQuery);
  return (
    <section className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2">
      {searchImageQuery.isLoading && <Spinner />}
      {searchImageQuery.data?.map((file) => (
        <UploadedImage key={file.id} file={file} />
      ))}
    </section>
  );
}
