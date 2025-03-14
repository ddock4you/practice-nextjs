"use client";

import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        width={30}
        height={10}
        className="!w-8 !h-auto"
        src="/images/dropbox_icon.png"
        alt="logo"
      />
      <span className="text-xl font-bold">Minibox</span>
    </div>
  );
}
