import { useState } from "react";

import SearchIcon from "./SearchIcon";

export default function SearchBar({ setSearchTerm, setPaginationOffset }) {
  const [title, setTitle] = useState(""); //  local state for input field

  return (
    <div className="m-4 flex max-w-md place-self-center rounded-full border">
      <input
        className="w-full p-1 bg-inherit rounded m-2"
        type="text"
        placeholder="Search..."
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button onClick={() => {
        setSearchTerm(title);
        setPaginationOffset(0)
        }}
      >
        <span className="w-auto flex justify-end items-center text-grey p-2">
          <SearchIcon />
        </span>
      </button>
    </div>
  );
}