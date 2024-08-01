import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const Searchbar = ({ fetchSavedDef }) => {
  //State variables
  const [searchInput, setSearchInput] = useState("");

  //Icon styles
  const style = { color: "black", fontSize: "1.5em" };

  //takes the word in the searchbar and is set to serchInput
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleEnter = () => {
    fetchSavedDef(searchInput);
  };

  return (
    <div className="flex w-full items-center justify-center rounded-2xl bg-white bg-opacity-20 shadow-xl outline-none">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        //value={searchInput}
        className="flex h-full w-full items-center justify-center bg-white bg-opacity-0 p-5 outline-none"
      />

      <IoIosSearch
        className="mr-5 opacity-50 transition-all hover:scale-110 hover:opacity-80"
        style={style}
        onClick={handleEnter}
      />
    </div>
  );
};

export default Searchbar;
