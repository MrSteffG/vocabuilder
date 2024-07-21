import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const Card = () => {
  const style = { color: "black", fontSize: "1.3em" };
  const heartStyleRed = { color: "black", fontSize: "1.3em" };

  return (
    <div className="flex flex-col justify-center items-center w-1/3 p-5 m-20 rounded-2xl shadow-xl bg-white bg-opacity-15">
      <h1 className="font-bold uppercase mb-5 border-b-2 border-red-200 w-full text-slate-700">
        Benevolent
      </h1>
      <div className="flex flex-col gap-5">
        <div className="mb-3 m-2">
          <h3 className="font-semibold text-slate-700">Definition</h3>
          <p className="text-slate-500">Well meaning and kindly.</p>
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
        />
      </div>
    </div>
  );
};

export default Card;
