"use client";

import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";

const Card = () => {
  //styles for icons
  const style = { color: "black", fontSize: "1.3em" };
  const heartStyleRed = { color: "black", fontSize: "1.3em" };

  //Variables
  const urlRandWord = "https://random-word-api.herokuapp.com/word";
  const [data, setData] = useState([]);
  const [def, setDef] = useState({ definition: "Testy", word: "Test me" });
  let favouritesObj = [];

  //Gets a random word

  const fetchWord = () => {
    return fetch(urlRandWord)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  };

  //Gets the definition of the random word
  const fetchDef = () => {
    fetchWord();
    return fetch(`https://api.api-ninjas.com/v1/dictionary?word=${data}`, {
      headers: {
        "X-Api-Key": "kOSm5RXchY0yvNn5T92DTA==NDQfoMYMJrnpymsK",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((d) => {
        setDef(d);
        console.log(d);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-1/3 p-5 m-20 rounded-2xl shadow-xl bg-white bg-opacity-15">
      <h1 className="font-bold uppercase mb-5 border-b-2 border-red-200 w-full text-slate-700">
        {def.word}
      </h1>
      <div className="flex flex-col gap-5">
        <div className="mb-3 m-2">
          <h3 className="font-semibold text-slate-700">Definition</h3>
          <p className="text-slate-500">{def.definition}</p>
        </div>
        <div className="mb-3 m-2">
          <h3 className="font-semibold text-slate-700">Example Sentence</h3>
          <p className="text-slate-500">
            I grew up happily under the benevolent influence of my Uncle Walt.
          </p>
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
        />
        <FaShare
          style={style}
          className="hover:scale-110 transition-all opacity-80"
        />
        <FaArrowRight
          style={style}
          className="hover:scale-110 transition-all opacity-80"
          onClick={fetchDef}
        />
      </div>
    </div>
  );
};

export default Card;
