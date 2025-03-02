"use client";

import { IconButton } from "@material-tailwind/react";
import Image from "next/image";

export default function UploadedImage() {
  return (
    <div className="w-full relative flex flex-col p-4 border border-gray-100 rounded-2xl shadow-md">
      {/* Image */}
      <div className="relative aspect-square w-full">
        <Image
          src="/images/0266554465.jpeg"
          alt="sample"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
      <div>sample image</div>
      <div className="absolute top-4 right-4">
        <IconButton onClick={() => {}} color="red">
          <i className="fas fa-trash" />
        </IconButton>
      </div>
    </div>
  );
}
