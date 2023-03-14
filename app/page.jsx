import Link from "next/link";
import Movie from "./components/Movie";
import Pagination from "./components/Pagination";

export default async function Home({ searchParams }) {
  const page = Number(searchParams.page) || 1;

  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=${page}`
  );
  const response = await data.json();

  return (
    <main>
      <h1 className="text-4xl font-bold text-center p-20 animate-pulse">
        <Link href="/">Movie DB</Link>
      </h1>
      <div
        className="grid gap-16 grid-cols-fluid scroll-mt-10"
        id="movies-grid"
      >
        {response.results.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
      <Pagination page={page} totalPages={response.total_pages} />
    </main>
  );
}
