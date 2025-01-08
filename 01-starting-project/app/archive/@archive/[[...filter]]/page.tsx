import NewsList from "@/app/components/NewsList";
import { getAvailableNewsYears, getNewsForYear } from "@/app/libs/news";
import Link from "next/link";

export default function FilterNewsPage({ params }: { params: { filter: string } }) {
  const filter = params.filter;
  const news = getNewsForYear(filter);
  const years = getAvailableNewsYears();
  let newsContent = <p>No news found</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  return (
    <>
      <header>
        <nav>
          <ul>
            {years.map((year) => (
              <li key={year}>
                <Link href={`/archive/${year}`}>{year}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
  // return (
  //   <>
  //     <NewsList news={news} />
  //   </>
  // );
}
