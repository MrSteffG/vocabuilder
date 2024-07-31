"use client";

import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

const SavedWords = ({ fetchSavedDef, favouritesArr }) => {
  const style = { color: "black", fontSize: "1.3em" };
  //to add button functionality, add an onclick that calls a the getDef function that passes word. e.g onClick={() => fetchSavedDef(word)}
  const favourites = favouritesArr.map((favourite) => (
    <div
      key={favourite.id}
      onClick={() => fetchSavedDef(favourite.word)}
      className="flex justify-between items-center hover:bg-gradient-to-tr hover:scale-105 hover:from-red-100 hover:via-purple-100 hover:to-blue-100 w-full p-1 rounded-xl transition-all duration-500"
    >
      <h3 className="font-semibold text-slate-700">{favourite.word}</h3>
      <div className="z-10 opacity-30 hover:opacity-80 p-2">
        <MdOutlineDeleteOutline style={style} className="" />
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col justify-start items-start w-full p-5 rounded-2xl shadow-xl bg-white bg-opacity-20 h-full overflow-scroll">
      <h1 className="font-bold mb-5 border-b-2 border-purple-400 w-full text-slate-700">
        Favourites
      </h1>
      <div className="flex flex-col justify-start m-2 gap-3 w-full pr-3 capitalize">
        {favourites}
      </div>
    </div>
  );
};

export default SavedWords;
