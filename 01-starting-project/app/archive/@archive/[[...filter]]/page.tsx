import NewsList from "@/app/components/NewsList";
import { getAvailableNewsYears, getNewsForYear } from "@/app/libs/news";
import Link from "next/link";

export default function FilterNewsPage({
  params,
}: {
  params: { filter: string[] };
}) {
  const filter = params.filter;
  console.log(filter);
  // const news = getNewsForYear(filter);
  const years = getAvailableNewsYears();
  const [selectedYear, selectedMonth] = filter;
  let news;
  let newsContent = <p>No news found</p>;

  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(selectedYear);
  }

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
