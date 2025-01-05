import Link from "next/link";

export default function MainHeader() {
  return (
    <header className="flex justify-between items-center mb-4">
      <div id="logo">
        <Link href="/">NextNews</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/news">News</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
