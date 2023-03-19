"use client";

import Link from "next/link";
import Movie from "./components/Movie";
import Pagination from "./components/Pagination";
import axios from "axios";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Home() {
  const getMovies = async (page) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.apiKey}&page=${page}&sort_by=${sort}`
    );
    return response.data;
  };

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [sort, setSort] = useState(
    searchParams.get("sort_by") || "popularity.desc"
  );

  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["movies", page],
    queryFn: () => getMovies(page),
    keepPreviousData: true,
  });

  const handleScroll = () => {
    const element = document.getElementById("movies-grid");
    element.scrollIntoView({ behavior: "smooth" });
  };

  const handlePage = (direction) => {
    const params = new URLSearchParams(searchParams);
    setPage((currentState) => {
      const newState =
        direction === "next" ? currentState + 1 : currentState - 1;
      params.set("page", newState);
      router.push(`${pathname}?${params}`);
      return newState;
    });
    handleScroll();
  };

  const handleSorting = (sortType) => {
    const params = new URLSearchParams(searchParams);
    searchParams.get("sort_by");
    console.log(searchParams.get("sort_by"));
    setSort((currentState) => {
      const newState = sortType;
      params.set("sort_by", newState);
      router.push(`${pathname}?${params}`);
      return newState;
    });
  };

  useEffect(() => {
    query.refetch();
  }, [searchParams]);

  if (query.isLoading) return <h1>Loading...</h1>;
  if (query.isError) return <h1>error loading data</h1>;

  return (
    <main>
      <h1 className="text-4xl font-bold text-center p-20 animate-pulse">
        <Link href="/">Movie DB</Link>
      </h1>
      <div className="sorting p-10">
        <button
          onClick={() => handleSorting("popularity.asc")}
          className="p-2 bg-cyan-700 text-white rounded-md mx-2"
        >
          popularity ↑
        </button>
        <button
          onClick={() => handleSorting("popularity.desc")}
          className="p-2 bg-cyan-700 text-white rounded-md mx-2"
        >
          popularity ↓
        </button>
        ⎮
        <button
          onClick={() => handleSorting("release_date.asc")}
          className="p-2 bg-cyan-700 text-white rounded-md mx-2"
        >
          release date ↑
        </button>
        <button
          onClick={() => handleSorting("release_date.desc")}
          className="p-2 bg-cyan-700 text-white rounded-md mx-2"
        >
          release date ↓
        </button>
        ⎮
        <button
          onClick={() => handleSorting("vote_average.asc")}
          className="p-2 bg-cyan-700 text-white rounded-md mx-2"
        >
          vote ↑
        </button>
        <button
          onClick={() => handleSorting("vote_average.desc")}
          className="p-2 bg-cyan-700 text-white rounded-md mx-2"
        >
          vote ↓
        </button>
        ⎮
        <button
          onClick={() => handleSorting("popularity.desc")}
          className="p-2 bg-cyan-700 text-white rounded-md mx-2"
        >
          Reset sort
        </button>
      </div>
      <div
        className="grid gap-16 grid-cols-fluid scroll-mt-10"
        id="movies-grid"
      >
        {query.data?.results?.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={query.data?.total_pages}
        handlePage={handlePage}
      />
    </main>
  );
}
