"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed text-center text-white font-bold bottom-0 left-0 right-0 p-4 bg-gray-900 z-20">
      <p>
        Movie Database Scraped form{" "}
        <Link className="text-blue-600" href="https://www.themoviedb.org/?language=ko">
          TMDB
        </Link>
      </p>
    </footer>
  );
}
