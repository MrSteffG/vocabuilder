"use client";

import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";

const Card = ({
  addWord,
  randomWord,
  setRandomWord,
  word,
  setWord,
  def,
  setDef,
}) => {
  //styles for icons
  const style = { color: "black", fontSize: "1.3em" };
  const heartStyleRed = { color: "black", fontSize: "1.3em" };

  //   //Variables
  //   const [randomWord, setRandomWord] = useState({ word: "Test" });
  //   const [word, setWord] = useState();
  //   const [def, setDef] = useState();

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

  //Fetches the definition of the randomWord
  const fetchDef = async (word) => {
    const urlDefinition = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
      const response = await fetch(urlDefinition);
      const defJson = await response.json();
      const definition = defJson[0].meanings[0].definitions[0].definition;
      if (definition != undefined) {
        setDef(definition);
        setWord(defJson[0].word);
      }
    } catch (error) {
      console.error(error);
      console.log("Undefined word");
    }
  };

  const fetchWhole = async () => {
    fetchWord().then(fetchDef(randomWord));
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-5 m-10 rounded-2xl shadow-xl bg-white bg-opacity-40">
      <h1 className="font-bold uppercase mb-5 border-b-2 border-red-200 w-full text-slate-700">
        {word}
      </h1>
      <div className="flex flex-col gap-5 w-full">
        <div className="mb-3 m-2 justify-start">
          <h3 className="font-semibold text-slate-700">Definition</h3>
          <p className="text-slate-500">{def}</p>
        </div>
      </div>
      <div className="flex w-full justify-evenly m-2 p-2">
        <FaArrowLeft
          style={style}
          className="hover:scale-110 transition-all opacity-80"
        />
        <FaHeart
          style={style}
          className="hover:scale-110 transition-all opacity-80"
          onClick={addWord}
        />
        <FaShare
          style={style}
          className="hover:scale-110 transition-all opacity-80"
        />
        <FaArrowRight
          style={style}
          className="hover:scale-110 transition-all opacity-80"
          onClick={fetchWhole}
        />
      </div>
    </div>
  );
};

export default Card;
