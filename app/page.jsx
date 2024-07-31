"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SavedWords from "./components/SavedWords";
import Searchbar from "./components/Searchbar";
import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import { createClient } from "@supabase/supabase-js";
import supabase from "./config/supabaseClient";

export default function Home() {
  const [fetchError, setFetchErr] = useState(null);
  // const [favouritesArr, setFavouritesArr] = useState();
  const [favouritesArr, setFavouritesArr] = useState([
    {
      id: Math.floor(Math.random() * 100),
      word: "test",
      def: "this is a test",
    },
  ]);

  useEffect(() => {
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
    fetchFavourites();
  }, []);

  //Variables
  const [randomWord, setRandomWord] = useState("Hello");

  const [defArr, setDefArr] = useState({
    id: Math.floor(Math.random() * 100),
    word: "definition",
    def: "this is a definition",
  });

  // const [favouritesArr, setFavouritesArr] = useState([
  //   {
  //     id: Math.floor(Math.random() * 100),
  //     word: "test",
  //     def: "this is a test",
  //   },
  // ]);

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

  const saveWord = () => {
    setFavouritesArr([...favouritesArr, defArr]);
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
      <div>
        {fetchError && <p>{fetchError}</p>}
        {favouritesArr && (
          <div className="flex h-60">
            {favouritesArr.map((favourite) => (
              <p className="" key={favourite.id}>
                {favourite.word}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
