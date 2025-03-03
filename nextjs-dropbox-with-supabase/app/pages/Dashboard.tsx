"use client";

import { useState } from "react";
import FileDragAndDropZone from "../components/FileDragAndDropZone";
import Logo from "../components/Logo";
import Search from "../components/Search";
import UploadedImageList from "../components/UploadedImageList";

export default function Dashboard() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <main className="flex flex-col gap-2 p-4">
      <Logo />
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      <FileDragAndDropZone />
      <UploadedImageList searchInput={searchInput} />
    </main>
  );
}
