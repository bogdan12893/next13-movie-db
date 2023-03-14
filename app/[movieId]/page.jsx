import Image from "next/image";

const MoviePage = async ({ params: { movieId } }) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 0 } }
  );
  const res = await data.json();

  const coverImg = `https://image.tmdb.org/t/p/original${res.poster_path}`;
  const backdropImg = `https://image.tmdb.org/t/p/original${res.backdrop_path}`;

  return (
    <div>
      <div className="">
        <Image
          src={backdropImg}
          alt={`${res.title} Poster`}
          width={1000}
          height={1000}
          className="fixed z-[-1] inset-0 h-screen w-screen opacity-10 object-cover"
        />
      </div>

      <div className="flex flex-wrap gap-10 justify-center lg:justify-start">
        <div className="order-1 lg:flex-1 lg:order-2">
          <h1 className="text-xl font-bold">{res.title}</h1>
          <p>Release date: {res.release_date}</p>
          <div>
            <span>Genres: </span>
            {res.genres.map((genre) => (
              <span key={genre.id}>{genre.name} | </span>
            ))}
            <p>
              <span>Rating: ⭐️ {res.vote_average}/10</span>
            </p>
            <p className="pt-5">{res.overview}</p>
          </div>
        </div>
        <div className="order-2 lg:order-1">
          <Image
            src={coverImg}
            alt={`${res.title} Poster`}
            width={500}
            height={500}
            className="group-hover:shadow-teal-300 group-hover:shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};
export default MoviePage;
