import { DUMMY_NEWS } from "@/dummy-news";
import NewsList from "@/app/components/NewsList";

export default function NewsPage({}) {
  return (
    <>
      <h1>News Page</h1>
      <NewsList news={DUMMY_NEWS} />
    </>
  );
}
