'use client';

import Link from 'next/link';
import { Home, Logout, People, Search, Send } from '@mui/icons-material';

export default function SideBar() {
  return (
    <aside className="flex h-screen w-fit flex-col justify-between border-r border-gray-300 p-6">
      <div className="flex flex-col gap-4">
        <Link href="/">
          <Home className="mb-10 text-2xl" />
        </Link>
        <Link href="/people">
          <People className="text-2xl" />
        </Link>
        <Link href="/discover">
          <Search className="text-2xl" />
        </Link>
        <Link href="/chat">
          <Send className="text-2xl" />
        </Link>
      </div>
      <div>
        <button onClick={() => console.log('logout')}>
          <Logout className="text-deep-purple-900 text-2xl" />
        </button>
      </div>
    </aside>
  );
}
