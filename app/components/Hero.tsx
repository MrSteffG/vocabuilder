import { SignInButton } from "@clerk/nextjs";
import React from "react";

const Hero = () => {
  return (
    <div className="flex h-4/5 flex-col items-center justify-center gap-14 max-md:w-2/3">
      <h1 className="text-8xl font-extrabold max-md:text-6xl">
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
