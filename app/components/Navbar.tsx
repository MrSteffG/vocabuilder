import React from "react";
import { FaUser } from "react-icons/fa";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const userStyle = { color: "white", fontSize: "1.2em" };

  return (
    <section className="flex justify-center items-center w-screen shadow-md bg-black fixed">
      <div className="flex justify-between items-center px-10 w-3/4">
        <div className="flex items-center justify-center p-3">
          <h1 className="text-white hover:bg-gradient-to-r hover:from-red-400 hover:via-purple-400 hover:to-blue-400 hover:bg-clip-text hover:text-transparent uppercase px-7 rounded-lg font-bold text-2xl hover:scale-105 transition-all">
            Vocabuilder
          </h1>
        </div>

        <SignedOut>
          <SignInButton>
            <button className="text-white hover:bg-gradient-to-r hover:from-red-400 hover:via-purple-400 hover:to-blue-400 hover:bg-clip-text hover:text-transparent uppercase rounded-lg font-bold hover:scale-105 transition-all">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </section>
  );
};

export default Navbar;
