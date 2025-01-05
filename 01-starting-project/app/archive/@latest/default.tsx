import NewsList from "@/app/components/NewsList";
import { getLatestNews } from "@/app/libs/news";
export default function LatestDefault() {
  const latestNews = getLatestNews();

  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={latestNews} />
    </>
  );
}
