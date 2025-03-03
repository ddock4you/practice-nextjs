"use client";

import { getImageUrl } from "@/utils/supabase/storage";
import { IconButton } from "@material-tailwind/react";
import Image from "next/image";

export default function UploadedImage({ name }: { name: string }) {
  return (
    <div className="w-full relative flex flex-col p-4 border border-gray-100 rounded-2xl shadow-md">
      {/* Image */}
      <div className="relative aspect-square w-full">
        <Image src={getImageUrl(name)} alt={name} fill className="object-cover rounded-2xl" />
      </div>
      <div>{name}</div>
      <div className="absolute top-4 right-4">
        <IconButton onClick={() => {}} color="red">
          <i className="fas fa-trash" />
        </IconButton>
      </div>
    </div>
  );
}
