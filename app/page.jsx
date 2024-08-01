"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SavedWords from "./components/SavedWords";
import Searchbar from "./components/Searchbar";
import TestCard from "./components/TestCard";
import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import supabase from "./config/supabaseClient";

export default function Home() {
  const [fetchError, setFetchErr] = useState(null);
  const [favouritesArr, setFavouritesArr] = useState([
    {
      id: Math.floor(Math.random() * 100),
      word: "test",
      def: "this is a test",
    },
  ]);

  //State variables
  const [randomWord, setRandomWord] = useState("Hello");
  const [defArr, setDefArr] = useState({
    // id: Math.floor(Math.random() * 100),
    word: "definition",
    def: "this is a definition",
  });

  //fetches favourites from supabase
  const fetchFavourites = async () => {
    const { data, error } = await supabase.from("favourites").select();
    if (error) {
      setFetchErr("Could not fetch the smoothies");
      setFavouritesArr(null);
      console.log(error);
    }
    if (data) {
      setFavouritesArr(data);
      setFetchErr(null);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  //fetches the definition of the selected favourite word
  //TODO: condense this and fetchDef in page.jsx into one function
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

  //Saves the current word in defArr to supabase favourites table
  const saveWord = async () => {
    const { data, error } = await supabase
      .from("favourites")
      .insert(defArr)
      .select();
    if (data) {
      console.log(data);
      fetchFavourites();
    }
  };

  return (
    <div className="flex h-full flex-col items-center bg-gradient-to-tr from-sky-100 via-emerald-50 to-yellow-100">
      <Navbar />
      <div className="flex h-screen w-2/3 items-center max-md:w-full">
        <SignedIn>
          <div className="flex h-2/5 w-full gap-10 max-md:w-full max-md:flex-col max-md:items-center">
            <div className="flex h-full w-2/3 flex-col items-center justify-start gap-10">
              <Searchbar fetchSavedDef={fetchSavedDef} />
              <Card
                randomWord={randomWord}
                setRandomWord={setRandomWord}
                defArr={defArr}
                setDefArr={setDefArr}
                saveWord={saveWord}
              />
            </div>
            <div className="flex h-full w-1/3 flex-col items-center justify-center max-md:w-2/3">
              <SavedWords
                fetchSavedDef={fetchSavedDef}
                favouritesArr={favouritesArr}
                setFavouritesArr={setFavouritesArr}
                fetchError={fetchError}
              />
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
      <TestCard />
    </div>
  );
}
