"use client";

import UploadedImage from "./UploadedImage";

export default function UploadedImageList() {
  return (
    <section className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2">
      <UploadedImage />
      <UploadedImage />
      <UploadedImage />
    </section>
  );
}
