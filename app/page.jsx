"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SavedWords from "./components/SavedWords";
import Searchbar from "./components/Searchbar";
import React, { useState } from "react";
import Hero from "./components/Hero";

export default function Home() {
  //Variables
  const [randomWord, setRandomWord] = useState("Hello");
  const [word, setWord] = useState();
  const [def, setDef] = useState();
  const [defArr, setDefArr] = useState({
    id: Math.floor(Math.random() * 100),
    word: "definition",
    def: "this is a definition",
  });

  //fetches the definition of the selected favourite word
  const fetchSavedDef = async (word) => {
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

  return (
    <div className="flex flex-col h-full items-center bg-gradient-to-tr from-sky-100 via-emerald-50 to-yellow-100">
      <Navbar />
      <div className="flex items-center h-screen w-2/3 max-md:w-full">
        <SignedIn>
          <div className="flex w-full gap-10 h-2/5 max-md:flex-col max-md:w-full max-md:items-center">
            <div className="flex flex-col w-2/3 h-full justify-start items-center gap-10">
              <Searchbar fetchSavedDef={fetchSavedDef} />
              <Card
                randomWord={randomWord}
                setRandomWord={setRandomWord}
                setWord={setWord}
                setDef={setDef}
                defArr={defArr}
                setDefArr={setDefArr}
              />
            </div>
            <div className="flex flex-col w-1/3 max-md:w-2/3 justify-center items-center h-full">
              <SavedWords setWord={setWord} fetchSavedDef={fetchSavedDef} />
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex items-center justify-center">
            <Hero />
          </div>
        </SignedOut>
      </div>
      <Footer />
    </div>
  );
}
