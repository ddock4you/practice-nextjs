"use client";

import { deleteFile } from "@/actions/storage";
import { getImageUrl } from "@/utils/supabase/storage";
import { IconButton, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { queryClient } from "@/config/react-query-provider";
import { FileProp } from "@/types/type";
import { convertTime } from "@/utils/format";

export default function UploadedImage({ file: { name, updated_at } }: { file: FileProp }) {
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
      <ul className="space-y-1 mt-2 text-right">
        <li className="font-sm truncate">{name}</li>
        <li className="text-xs text-gray-800">{convertTime(updated_at)}</li>
      </ul>
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
