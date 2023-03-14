"use client";
import Link from "next/link";

const Pagination = ({ page, totalPages }) => {
  const handleScroll = () => {
    const element = document.getElementById("movies-grid");
    element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="my-16 flex items-center justify-center md:justify-start">
      {page > 1 && (
        <Link
          onClick={handleScroll}
          href={`/?page=${page - 1}`}
          className="bg-purple-400 p-3 mr-3 rounded-md"
        >
          Prev
        </Link>
      )}
      <div className="bg-purple-600 p-3 mr-3 rounded-md">
        pages: {totalPages}
      </div>
      <Link
        onClick={handleScroll}
        href={`/?page=${page + 1}`}
        className="bg-purple-400 p-3 rounded-md"
      >
        Next
      </Link>
    </div>
  );
};
export default Pagination;
