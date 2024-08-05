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
import SavedWords from "./components/SavedWords";
import Searchbar from "./components/Searchbar";
import TestCard from "./components/TestCard";
import Hero from "./components/Hero";

//React imports
import React, { useEffect, useState } from "react";

//Supabase imports
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database

const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    },
  );

  return supabase;
};

export default function Home() {
  const [favouritesArr, setFavouritesArr] = useState([
    {
      id: Math.floor(Math.random() * 100),
      word: "Loading",
      def: "this is a test",
    },
  ]);

  //State variables
  const { isSignedIn, isLoading, user } = useUser();
  const [randomWord, setRandomWord] = useState("Hello");
  // const [favouritesArr, setFavouritesArr] = useState({});
  const [defArr, setDefArr] = useState({
    // id: Math.floor(Math.random() * 100),
    word: "definition",
    def: "this is a definition",
  });

  const Header = () => {
    const { isSignedIn } = useUser();

    return (
      <header className="mt-20 text-4xl font-bold">
        {isSignedIn ? (
          <div>Welcome back {user.firstName}</div>
        ) : (
          <div>not signed in m8</div>
        )}
      </header>
    );
  };

  //fetches favourites from supabase

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
    } finally {
      console.log("finished");
    }
  };

  //Saves the current word in defArr to supabase favourites table
  const { session } = useSession();

  const saveWord = async () => {
    const supabaseAccessToken = await session.getToken({
      template: "Supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);
    const { data, error } = await supabase
      .from("favourites")
      .insert({ word: defArr.word, def: defArr.def, user_id: session.user.id })
      .select();
    if (data) {
      setFavouritesArr([...favouritesArr, data[0]]);
      console.log(data);
    }
  };

  return (
    <div className="flex h-full flex-col items-center bg-gradient-to-tr from-sky-100 via-emerald-50 to-yellow-100">
      <Navbar />
      <div className="flex h-full w-full flex-col items-center justify-center border-2">
        <div className="flex h-screen w-2/3 items-center max-md:w-full">
          <FavouritesList
            favouritesArr={favouritesArr}
            setFavouritesArr={setFavouritesArr}
          />
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
      </div>
      <Footer />
    </div>
  );
}

const FavouritesList = ({ favouritesArr, setFavouritesArr }) => {
  const { session } = useSession();
  const [loading, setLoading] = useState(true);

  //On first load, fetch and set favourites
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        setLoading(true);
        const supabaseAccessToken = await session.getToken({
          template: "Supabase",
        });

        const supabase = await supabaseClient(supabaseAccessToken);
        const { data: favourites, error } = await supabase
          .from("favourites")
          .select("*");
        setFavouritesArr(favourites);
      } catch (error) {
        console.log("Catch statement, something went wrong" + error);
      } finally {
        setLoading(false);
        console.log(favouritesArr);
      }
    };
    fetchFavourites();
  }, [session, setFavouritesArr]);
};
