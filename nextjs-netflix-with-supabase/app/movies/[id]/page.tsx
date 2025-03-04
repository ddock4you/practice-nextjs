import MovieDetail from "@/app/containers/MovieDetail";

export default function Page({ params }) {
  return (
    <main className="flex py-16 items-center bg-blue-50 w-full absolute inset-0">
      <MovieDetail id={params.id} />
    </main>
  );
}
