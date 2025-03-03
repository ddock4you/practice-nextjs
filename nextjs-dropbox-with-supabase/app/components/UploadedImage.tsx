"use client";

import { deleteFile } from "@/actions/storage";
import { getImageUrl } from "@/utils/supabase/storage";
import { IconButton, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { queryClient } from "../config/react-query-provider";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

export default function UploadedImage({ name }: { name: string }) {
  const deleteFileMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
  });

  return (
    <div className="w-full relative flex flex-col p-4 border border-gray-100 rounded-2xl shadow-md">
      {/* Image */}
      <div className="relative aspect-square w-full">
        <Image src={getImageUrl(name)} alt={name} fill className="object-cover rounded-2xl" />
      </div>
      <div>{name}</div>
      <div className="absolute top-4 right-4">
        <IconButton
          onClick={() => {
            deleteFileMutation.mutate(name);
          }}
          color="red"
        >
          {deleteFileMutation.isPending ? <Spinner /> : <i className="fas fa-trash" />}
        </IconButton>
      </div>
    </div>
  );
}
