"use client";

import React, { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { fetchWhole } from "./wordFunctions.ts";

const Card = ({
  setRandomWord,
  defObj,
  setDefObj,
  saveWord,
  wordArr,
  setWordArr,
}) => {
  //styles for icons
  const style = { color: "black", fontSize: "1.3em" };

  useEffect(() => {
    fetchWhole().then((definition) => {
      setDefObj(definition);
      setRandomWord(definition.word);
    });
  }, []);

  const newFetchWhole = async () => {
    fetchWhole().then((definition) => {
      setDefObj(definition);
      setRandomWord(definition.word);
      setWordArr([...wordArr, defObj]);
      console.log(wordArr);
    });
  };

  //Update so back button cycles through the whole sessions word array
  const previousWord = () => {
    setDefObj(wordArr[wordArr.length - 1]);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-between rounded-2xl bg-white bg-opacity-20 p-5 shadow-xl">
      <h1 className="mb-5 w-full border-b-2 border-purple-400 font-bold uppercase text-slate-700">
        {defObj.word}
      </h1>
      <div className="flex w-full flex-col gap-5">
        <div className="m-2 mb-3 justify-start">
          <h3 className="font-semibold text-slate-700">Definition</h3>
          <p className="text-slate-500">{defObj.definition}</p>
        </div>
      </div>
      <div className="m-2 flex w-full justify-evenly p-2">
        <FaArrowLeft
          style={style}
          className="transition-all hover:scale-110"
          onClick={previousWord}
        />
        <FaHeart
          style={style}
          className="transition-all hover:scale-110"
          onClick={saveWord}
          onMouseOver={({ target }) => (target.style.color = "red")}
          onMouseOut={({ target }) => (target.style.color = "black")}
        />
        <FaShare style={style} className="transition-all hover:scale-110" />
        <FaArrowRight
          style={style}
          className="transition-all hover:scale-110"
          onClick={newFetchWhole}
        />
      </div>
    </div>
  );
};

export default Card;
