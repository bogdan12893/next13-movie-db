"use client";

const Pagination = ({ totalPages, page, handlePage }) => {
  return (
    <div className="my-16 flex items-center justify-center md:justify-start">
      {page > 1 && (
        <button
          onClick={() => handlePage()}
          className="bg-purple-400 p-3 mr-3 rounded-md"
        >
          Prev
        </button>
      )}
      <div className="bg-purple-600 p-3 mr-3 rounded-md">
        pages: {totalPages}
      </div>

      <button
        onClick={() => handlePage("next")}
        className="bg-purple-400 p-3 rounded-md"
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
