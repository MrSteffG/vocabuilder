"use client";

import Card from "./components/Card";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SavedWords from "./components/SavedWords";
import Searchbar from "./components/Searchbar";
import React, { useState } from "react";

export default function Home() {
  const [favourites, setFavourites] = useState([
    "Benevolent",
    "Rich",
    "Meaning",
  ]);

  const addWord = () => {
    setFavourites([...favourites, "Hello"]);
  };

  return (
    <div className="flex flex-col h-screen justify-start bg-gradient-to-tr from-sky-100 via-emerald-50 to-yellow-100">
      <Navbar />
      <div className="flex justify-center items-start gap-10 mt-10">
        <div className="flex flex-col w-1/3 justify-center items-center">
          <Searchbar />
          <Card addWord={addWord} />
        </div>
        <div className="flex flex-col w-1/3 justify-center items-center">
          <SavedWords favourites={favourites} addWord={addWord} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
