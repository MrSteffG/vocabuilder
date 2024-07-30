"use client";

import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

const SavedWords = ({ fetchSavedDef }) => {
  const [favouritesArr, setFavouritesArr] = useState([
    {
      id: Math.floor(Math.random() * 100),
      word: "test",
      def: "this is a test",
    },
  ]);
  const style = { color: "black", fontSize: "1.3em" };
  //to add button functionality, add an onclick that calls a the getDef function that passes word. e.g onClick={() => fetchSavedDef(word)}
  const favourites = favouritesArr.map((favourite) => (
    <div key={favourite.id} onClick={() => fetchSavedDef(favourite.word)}>
      {favourite.word}
    </div>
  ));

  return (
    <div className="flex flex-col justify-start items-start w-full p-5 rounded-2xl shadow-xl bg-white bg-opacity-20 h-full overflow-scroll">
      <h1 className="font-bold mb-5 border-b-2 border-red-200 w-full text-slate-700">
        Favourites
      </h1>
      <div className="flex flex-col justify-start m-2 gap-3 w-full pr-3 capitalize">
        <div className="flex justify-between items-center hover:bg-gradient-to-l hover:scale-105 hover:from-red-100 hover:via-purple-100 hover:to-blue-100 w-full p-2 rounded-xl transition-all duration-500">
          <h3 className="font-semibold text-slate-700">{favourites}</h3>
          <div className="z-10 opacity-30 hover:opacity-80 p-2">
            <MdOutlineDeleteOutline style={style} className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedWords;
