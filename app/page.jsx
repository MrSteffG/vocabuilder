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
  const [randomWord, setRandomWord] = useState("Steff");
  const [word, setWord] = useState();
  const [def, setDef] = useState();

  //fetches the definition of the selected favourite word
  const fetchSavedDef = async (word) => {
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

  return (
    <div className="flex flex-col h-full items-center bg-gradient-to-tr from-sky-100 via-emerald-50 to-yellow-100">
      <Navbar />
      <div className="flex items-center h-screen w-2/3">
        <SignedIn>
          <div className="flex w-full gap-10 h-2/5">
            <div className="flex flex-col w-2/3 max-md:w-2/3 h-full justify-start items-center gap-10">
              <Searchbar fetchSavedDef={fetchSavedDef} />
              <Card
                randomWord={randomWord}
                setRandomWord={setRandomWord}
                word={word}
                setWord={setWord}
                def={def}
                setDef={setDef}
              />
            </div>
            <div className="flex flex-col w-1/3 max-md:w-2/3 justify-center items-center h-full">
              <SavedWords setWord={setWord} fetchSavedDef={fetchSavedDef} />
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <Hero />
        </SignedOut>
      </div>
      <Footer />
    </div>
  );
}
