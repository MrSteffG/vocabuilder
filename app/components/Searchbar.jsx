import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const Searchbar = ({ fetchSavedDef }) => {
  const [searchInput, setSearchInput] = useState("");
  const style = { color: "black", fontSize: "1.5em" };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleEnter = () => {
    fetchSavedDef(searchInput);
  };

  return (
    <div className="flex w-full items-center justify-center rounded-2xl shadow-xl bg-white bg-opacity-40 outline-none border-2">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={searchInput}
        className="flex justify-center items-center w-full h-full p-5 bg-white bg-opacity-0 outline-none"
      />

      <IoIosSearch
        className="mr-5 opacity-50 hover:scale-110 hover:opacity-80 transition-all"
        style={style}
        onClick={handleEnter}
      />
    </div>
  );
};

export default Searchbar;
