import React from "react";

const SavedWords = () => {
  const wordArray = ["Benevolent", "Rich", "Meaning"];

  const randomWords = wordArray.map((dataObj) => (
    <h3 className="font-semibold text-slate-700 hover:scale-105 hover:bg-gradient-to-l hover:from-yellow-50 hover:to-red-50 w-full p-2 rounded-xl transition-all duration-500">
      {dataObj}
    </h3>
  ));

  return (
    <div className="flex flex-col justify-center items-start w-full p-5 rounded-2xl shadow-xl bg-white bg-opacity-40">
      <h1 className="font-bold mb-5 border-b-2 border-red-200 w-full text-slate-700">
        Saved Words
      </h1>
      <div className="flex flex-col justify-start m-2 gap-3 w-full">
        {randomWords}
      </div>
    </div>
  );
};

export default SavedWords;
