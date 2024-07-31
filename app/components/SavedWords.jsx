"use client";

import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

const SavedWords = ({ fetchSavedDef, favouritesArr }) => {
  const style = { color: "black", fontSize: "1.3em" };

  //to add button functionality, add an onclick that calls a the getDef function that passes word. e.g onClick={() => fetchSavedDef(word)}

  // const favourites = favouritesArr.map((favourite) => (
  //   <div
  // key={favourite.id}
  // onClick={() => fetchSavedDef(favourite.word)}
  // className="flex w-full items-center justify-between rounded-xl p-1 transition-all duration-500 hover:scale-105 hover:bg-gradient-to-tr hover:from-red-100 hover:via-purple-100 hover:to-blue-100"
  //   >
  //     <h3 className="font-semibold text-slate-700">{favourite.word}</h3>
  //     <div className="z-10 p-2 opacity-30 hover:opacity-80">
  //       <MdOutlineDeleteOutline style={style} className="" />
  //     </div>
  //   </div>
  // ));

  const favourites = favouritesArr.map((favourite) => (
    <div
      key={favourite.id}
      onClick={() => fetchSavedDef(favourite.word)}
      className="flex w-full items-center justify-between rounded-xl p-1 transition-all duration-500 hover:scale-105 hover:bg-gradient-to-tr hover:from-red-100 hover:via-purple-100 hover:to-blue-100"
    >
      <h3 className="font-semibold text-slate-700">{favourite.word}</h3>
      <div className="z-10 p-2 opacity-30 hover:opacity-80">
        <MdOutlineDeleteOutline style={style} className="" />
      </div>
    </div>
  ));

  return (
    <div className="flex h-full w-full flex-col items-start justify-start overflow-scroll rounded-2xl bg-white bg-opacity-20 p-5 shadow-xl">
      <h1 className="mb-5 w-full border-b-2 border-purple-400 font-bold text-slate-700">
        Favourites
      </h1>
      <div className="m-2 flex w-full flex-col justify-start gap-3 pr-3 capitalize">
        {favourites}
      </div>
    </div>
  );
};

export default SavedWords;
