import { SignInButton } from "@clerk/nextjs";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center h-4/5 gap-14">
      <h1 className="font-extrabold text-8xl">
        <span className="heroLetters">Expand</span> {""}
        <span className="heroLetters">your</span> {""}
        <span className="heroLetters">Vocabulary.</span>
      </h1>
      <SignInButton>
        <button className="actionButton p-4 font-semibold uppercase">
          Sign in to get started
        </button>
      </SignInButton>
    </div>
  );
};

export default Hero;
