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
    <section className="fixed flex w-screen items-center justify-center bg-black shadow-md">
      <div className="flex w-3/4 items-center justify-between px-10">
        <div className="flex items-center justify-center p-3">
          <h1 className="rounded-lg px-7 text-2xl font-bold uppercase text-white transition-all hover:scale-105 hover:bg-gradient-to-r hover:from-red-400 hover:via-purple-400 hover:to-blue-400 hover:bg-clip-text hover:text-transparent max-md:hidden">
            Vocabuilder
          </h1>
          <h1 className="rounded-lg px-7 text-2xl font-bold uppercase text-white opacity-0 hover:bg-gradient-to-r hover:from-red-400 hover:via-purple-400 hover:to-blue-400 hover:bg-clip-text hover:text-transparent max-md:opacity-100">
            V
          </h1>
        </div>

        <SignedOut>
          <SignInButton>
            <button className="rounded-lg font-bold uppercase text-white transition-all hover:scale-105 hover:bg-gradient-to-r hover:from-red-400 hover:via-purple-400 hover:to-blue-400 hover:bg-clip-text hover:text-transparent">
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
