"use client";

//React imports
import React, { useEffect, useState } from "react";

//Clerk imports
import { useSession } from "@clerk/nextjs";

//Supabase imports
import supabaseClient from "../config/supabaseClient";

//Icon imports
import { MdOutlineDeleteOutline } from "react-icons/md";

const FavouritesList = ({ favouritesArr, setFavouritesArr, fetchSavedDef }) => {
  const { session } = useSession();
  const [loading, setLoading] = useState(true);
  const style = { color: "black", fontSize: "1.3em" };

  //On first load, fetch and set favouritesArr
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

  const favourites = favouritesArr.map((favourite) => (
    <div
      key={favourite.id}
      onClick={() => fetchSavedDef(favourite.word)}
      className="flex w-full items-center justify-between rounded-xl p-1 transition-all duration-500 hover:scale-105 hover:bg-gradient-to-tr hover:from-red-100 hover:via-purple-100 hover:to-blue-100"
    >
      <h3 className="font-semibold text-slate-700">{favourite.word}</h3>
      <div className="z-10 p-2 opacity-30 hover:opacity-80">
        <MdOutlineDeleteOutline style={style} className="" />
      </div>
    </div>
  ));

  return (
    <div className="no-scrollbar flex h-full w-full flex-col items-start justify-start overflow-x-scroll rounded-2xl bg-white bg-opacity-20 p-5 shadow-xl">
      <h1 className="mb-5 w-full border-b-2 border-purple-400 font-bold text-slate-700">
        Favourites
      </h1>
      <div className="m-2 flex w-full flex-col justify-start gap-3 pr-3 capitalize">
        {favourites}
      </div>
    </div>
  );
};

export default FavouritesList;
