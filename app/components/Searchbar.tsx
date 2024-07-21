import React from "react";
import { IoIosSearch } from "react-icons/io";

const Searchbar = () => {
  const style = { color: "black", fontSize: "1.5em" };

  return (
    <div className="flex w-full items-center justify-center rounded-2xl shadow-xl bg-white bg-opacity-40 outline-none">
      <input
        type="text"
        placeholder="Search..."
        className="flex justify-center items-center w-full h-full p-5 bg-white bg-opacity-0 outline-none"
      />

      <IoIosSearch
        className="mr-5 opacity-50 hover:scale-110 hover:opacity-80 transition-all"
        style={style}
      />
    </div>
  );
};

export default Searchbar;
