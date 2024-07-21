import React from "react";

const Navbar = () => {
  return (
    <section className="flex justify-center w-screen px-10 pt-5 shadow-md bg-white bg-opacity-40">
      <div className="flex justify-between w-3/4">
        <div className="flex">
          <h1 className="bg-red-400 text-white px-7 rounded-t-lg font-bold text-lg border-red-400 border-t-2 border-x-2 hover:bg-white hover:text-red-400 transition-all">
            Vocabulary
          </h1>
        </div>
        <div className="flex gap-1 font-semibold justify-center">
          <p className="navButton border-red-400 text-red-400 hover:bg-red-400">
            New Words
          </p>
          <p className="navButton border-blue-400 text-blue-400 hover:bg-blue-400">
            Saved Words
          </p>
          <p className="navButton border-green-400 text-green-400 hover:bg-green-400">
            Friends
          </p>
          <p className="navButton border-yellow-400 text-yellow-400 hover:bg-yellow-400">
            Profile
          </p>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
