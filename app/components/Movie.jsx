"use client";
import Image from "next/image";
import Link from "next/link";
const Movie = ({ title, id, poster_path, release_date }) => {
  const imgPath = `https://image.tmdb.org/t/p/original${poster_path}`;

  const formatedDate = () => {
    const date = new Date(release_date);
    return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
  };

  return (
    <Link href={`/${id}`}>
      <div className="group flex flex-col justify-between h-full">
        <div>
          <h1 className="font-bold text-lg">{title}</h1>
          <p className="text-sm">{formatedDate()}</p>
        </div>
        <Image
          src={imgPath}
          alt={`${title} Poster`}
          width={500}
          height={500}
          className="group-hover:shadow-teal-300 group-hover:shadow-xl duration-200 transition-shadow ease-in-out"
        />
      </div>
    </Link>
  );
};
export default Movie;
