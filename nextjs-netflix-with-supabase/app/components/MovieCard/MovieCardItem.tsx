"use client";

import Image from "next/image";
import Link from "next/link";

export default function MovieCardItem() {
  return (
    <div className="relative w-full aspect-[2/3]">
      <Image
        src="https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg"
        alt="Dune: Part Two"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <Link href="/movies/1">
        <div className="flex items-center justify-center absolute inset-0 z-10 bg-black opacity-0 transition-opacity duration-300 hover:opacity-80">
          <p className="text-xl font-bold text-white">Dune: Part Two</p>
        </div>
      </Link>
    </div>
  );
}
