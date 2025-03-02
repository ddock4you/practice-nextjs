"use client";

import FileDragAndDropzone from "../components/FileDragAndDropzone";
import Logo from "../components/Logo";
import Search from "../components/Search";
import UploadedImageList from "../components/UploadedImageList";

export default function Dashboard() {
  return (
    <main className="flex flex-col gap-2 p-4">
      <Logo />
      <Search />
      <FileDragAndDropzone />
      <UploadedImageList />
    </main>
  );
}
