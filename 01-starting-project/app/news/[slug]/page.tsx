import { DUMMY_NEWS } from "@/dummy-news";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function SlugPage({ params: { slug } }: { params: { slug: string } }) {
  const newsItem = DUMMY_NEWS.find((news) => news.slug === slug);
  if (!newsItem) notFound();
  const imageSrc = `/images/news/${newsItem.image}`;

  return (
    <article className="news-article">
      <header>
        <Link href={{ pathname: `/news/${slug}/image` }}>
          <img src={imageSrc} alt={newsItem.title} />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
}
