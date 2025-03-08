import { getMovie } from "@/actions/movieAction";
import MovieDetail from "@/app/containers/MovieDetail";
import { Database } from "@/types_db";

type Movie = Database["public"]["Tables"]["movie"]["Row"];
type Props = {
  params: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props) {
  const movie = await getMovie(params.id);

  return {
    title: movie.title,
    description: movie.overview,
    openGraph: {
      images: [movie.image_url],
    },
  };
}

export default async function Page({ params: { id } }: { params: { id: number } }) {
  const movie: Movie = await getMovie(id);

  return (
    <main className="flex py-16 items-center bg-blue-50 w-full absolute inset-0">
      {movie ? <MovieDetail movie={movie} /> : <p>Movie not found</p>}
    </main>
  );
}
