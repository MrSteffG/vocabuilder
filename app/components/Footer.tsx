import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex w-screen items-center justify-center bg-black p-10 text-white">
      <div className="flex w-2/3">
        <a
          className="flex flex-row items-center justify-center gap-4"
          href="https://github.com/MrSteffG/vocabuilder"
          target="_blank"
        >
          <FaGithub /> <span>Github repository</span>
        </a>
      </div>
    </div>
  );
};

export default Footer;
