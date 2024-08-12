"use client";

//Clerk imports
import {
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
  UserButton,
  useSession,
} from "@clerk/nextjs";

//Component imports
import Card from "./components/Card";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Hero from "./components/Hero";
import FavouritesList from "./components/FavouritesList";

//React imports
import React, { useEffect, useState } from "react";

//Supabase imports
import supabaseClient from "./config/supabaseClient";
import Head from "next/head";
import fetchDef from "./components/wordFunctions";

import { Montserrat } from "next/font/google";

//👇 Configure our font object
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  //State variables
  const { isSignedIn, isLoading, user } = useUser();
  const { session } = useSession();
  const [randomWord, setRandomWord] = useState("Hello");

  const [defObj, setDefObj] = useState({
    word: "definition",
    def: "this is a definition",
  });
  const [favouritesArr, setFavouritesArr] = useState([
    {
      id: Math.floor(Math.random() * 100),
      word: "Loading",
      def: "this is a test",
    },
  ]);
  const [wordArr, setWordArr] = useState([defObj]);

  const Header = () => {
    const { isSignedIn } = useUser();

    return (
      <header className="mt-20 text-4xl font-semibold">
        {isSignedIn ? (
          <h1 className={montserrat.className}>
            Welcome back
            <span className="heroLetters"> {user.firstName}</span>
          </h1>
        ) : (
          <div className=""></div>
        )}
      </header>
    );
  };

  //fetches the definition of the selected favourite word
  //TODO: condense this and fetchDef in card.jsx into one function
  const fetchSavedDef = async (word) => {
    const urlDefinition = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
      const response = await fetch(urlDefinition);
      const defJson = await response.json();
      const definition = await defJson[0].meanings[0].definitions[0].definition;
      console.log(defObj);
      setDefObj({
        id: Math.floor(Math.random() * 100),
        word: defJson[0].word,
        definition: definition,
      });
      console.log(definition);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finished");
    }
  };

  // const fetchSavedDef = async (word) => {
  //   fetchDef(word).then((definition) => {
  //     setDefObj(definition);
  //   });
  // };

  //Saves the current word in defObj to supabase favourites table
  const saveWord = async () => {
    const supabaseAccessToken = await session.getToken({
      template: "Supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);
    const { data, error } = await supabase
      .from("favourites")
      .insert({ word: defObj.word, def: defObj.def, user_id: session.user.id })
      .select();
    if (data) {
      setFavouritesArr([...favouritesArr, data[0]]);
    }
  };

  const deleteFavourite = async (favouriteId, favouritesArr) => {
    try {
      const supabaseAccessToken = await session.getToken({
        template: "Supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken);
      const { data, error } = await supabase
        .from("favourites")
        .delete()
        .eq("id", favouriteId)
        .select("*");
      setFavouritesArr((oldValues) => {
        return oldValues.filter((favourites) => favourites.id !== favouriteId);
      });
    } catch (error) {
      console.log("Catch statement, something went wrong" + error);
    } finally {
    }
  };

  return (
    <div className="flex h-full flex-col items-center bg-gradient-to-tr from-sky-100 via-emerald-50 to-yellow-100">
      <Navbar />
      <div className="flex h-full w-full flex-col items-center justify-center border-2">
        <div className="flex h-screen w-2/3 items-center max-md:w-full">
          <SignedIn>
            <div className="mb-10 flex h-full w-full flex-col items-center justify-center gap-20">
              <Header />
              <div className="flex h-2/5 w-full gap-10 max-md:w-full max-md:flex-col max-md:items-center">
                <div className="flex h-full w-2/3 flex-col items-center justify-start gap-10">
                  <Searchbar fetchSavedDef={fetchSavedDef} />
                  <Card
                    randomWord={randomWord}
                    setRandomWord={setRandomWord}
                    defObj={defObj}
                    setDefObj={setDefObj}
                    saveWord={saveWord}
                    wordArr={wordArr}
                    setWordArr={setWordArr}
                  />
                </div>
                <div className="flex h-full w-1/3 flex-col items-center justify-center max-md:w-2/3">
                  <FavouritesList
                    favouritesArr={favouritesArr}
                    fetchSavedDef={fetchSavedDef}
                    setFavouritesArr={setFavouritesArr}
                    deleteFavourite={deleteFavourite}
                  />
                </div>
              </div>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex items-center justify-center">
              <Hero />
            </div>
          </SignedOut>
        </div>
      </div>
      <Footer />
    </div>
  );
}
