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
    <section className="flex justify-center items-center w-screen shadow-md bg-white bg-opacity-40">
      <div className="flex justify-between items-center px-10 p-3 w-3/4">
        <div className="flex items-center justify-center p-3">
          <h1 className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent uppercase px-7 rounded-lg font-bold text-2xl hover:scale-105 transition-all">
            Vocabuilder
          </h1>
        </div>

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </section>
  );
};

export default Navbar;
