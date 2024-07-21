import React from "react";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const userStyle = { color: "white", fontSize: "1.2em" };

  return (
    <section className="flex justify-center items-center w-screen shadow-md bg-white bg-opacity-40">
      <div className="flex justify-between items-center px-10 p-3 w-3/4">
        <div className="flex items-center justify-center p-3">
          <h1 className="border-slate-800 text-slate-800 border-4 px-7 rounded-lg font-bold text-lg hover:scale-105 transition-all">
            Vocabuilder
          </h1>
        </div>

        <div className="bg-black p-2 rounded-full hover:scale-105 transition-all duration-300 hover:bg-gradient-to-tr from-red-500 to-yellow-300">
          <FaUser style={userStyle} />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
