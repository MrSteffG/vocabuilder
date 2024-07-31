"use client";

import React from "react";
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
      console.log(defArr);
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
  const fetchWhole = async () => {
    fetchWord().then(fetchDef(randomWord));
  };

  return (
    <div className="flex flex-col justify-between items-center w-full p-5 rounded-2xl shadow-xl bg-white bg-opacity-20 h-full">
      <h1 className="font-bold uppercase mb-5 border-b-2 border-purple-400 w-full text-slate-700">
        {defArr.word}
      </h1>
      <div className="flex flex-col gap-5 w-full">
        <div className="mb-3 m-2 justify-start">
          <h3 className="font-semibold text-slate-700">Definition</h3>
          <p className="text-slate-500">{defArr.def}</p>
        </div>
      </div>
      <div className="flex w-full justify-evenly m-2 p-2">
        <FaArrowLeft style={style} className="hover:scale-110 transition-all" />
        <FaHeart
          style={style}
          className="hover:scale-110 transition-all"
          onClick={saveWord}
          onMouseOver={({ target }) => (target.style.color = "red")}
          onMouseOut={({ target }) => (target.style.color = "black")}
        />
        <FaShare style={style} className="hover:scale-110 transition-all" />
        <FaArrowRight
          style={style}
          className="hover:scale-110 transition-all"
          onClick={fetchWhole}
        />
      </div>
    </div>
  );
};

export default Card;
