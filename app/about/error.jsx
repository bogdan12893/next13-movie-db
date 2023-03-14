"use client";

const Error = ({ error, reset }) => {
  return (
    <div>
      <p>this ain't loadin' up: {error.message}</p>
      <button onClick={() => reset()}>reload page</button>
    </div>
  );
};
export default Error;
