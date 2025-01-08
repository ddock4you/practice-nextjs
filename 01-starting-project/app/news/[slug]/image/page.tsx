import { DUMMY_NEWS } from "@/dummy-news";
import { notFound } from "next/navigation";

export default function ImagePage({ params: { slug } }: { params: { slug: string } }) {
  const newsItem = DUMMY_NEWS.find((news) => news.slug === slug);
  if (!newsItem) notFound();

  const imageSrc = `/images/news/${newsItem.image}`;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <img src={imageSrc} alt={newsItem.title} className="max-w-full max-h-[90vh] object-contain" />
    </div>
  );
}
