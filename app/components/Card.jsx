"use client";

import React, { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const Card = ({ randomWord, setRandomWord, defArr, setDefArr, saveWord }) => {
  //styles for icons
  const style = { color: "black", fontSize: "1.3em" };

  //Fetches a random word
  const fetchWord = async () => {
    const urlRandWord = "https://api.api-ninjas.com/v1/randomword";
    try {
      const response = await fetch(urlRandWord, {
        headers: {
          "x-api-key": "kOSm5RXchY0yvNn5T92DTA==NDQfoMYMJrnpymsK",
        },
      });
      const json = await response.json();
      const wordString = await json.word.toString();
      setRandomWord(wordString);
      console.log(`Random word is ${randomWord}`);
    } catch (error) {
      console.error(error);
    }
  };

  //Fetches the definition of the randomWord and sets the word and definition to defArr with an id
  const fetchDef = async (word) => {
    const urlDefinition = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
      const response = await fetch(urlDefinition);
      const defJson = await response.json();
      const definition = await defJson[0].meanings[0].definitions[0].definition;
      setDefArr({
        id: Math.floor(Math.random() * 100),
        word: defJson[0].word,
        def: definition,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Gets the random word which is passed into the function to fetch its definition
  useEffect(() => {
    fetchWhole();
  }, []);

  //fetches random word then fetches the definition
  const fetchWhole = async () => {
    fetchWord().then(fetchDef(randomWord));
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-between rounded-2xl bg-white bg-opacity-20 p-5 shadow-xl">
      <h1 className="mb-5 w-full border-b-2 border-purple-400 font-bold uppercase text-slate-700">
        {defArr.word}
      </h1>
      <div className="flex w-full flex-col gap-5">
        <div className="m-2 mb-3 justify-start">
          <h3 className="font-semibold text-slate-700">Definition</h3>
          <p className="text-slate-500">{defArr.def}</p>
        </div>
      </div>
      <div className="m-2 flex w-full justify-evenly p-2">
        <FaArrowLeft style={style} className="transition-all hover:scale-110" />
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
          onClick={fetchWhole}
        />
      </div>
    </div>
  );
};

export default Card;
