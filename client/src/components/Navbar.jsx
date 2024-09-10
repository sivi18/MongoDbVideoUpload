import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full z-40 fixed top-0 p-4 bg-gradient-to-r from-slate-900 to-slate-700 shadow-md">
      <ul className="flex justify-center gap-10 md:gap-20">
        <Link
          to={"/"}
          className="text-xl md:text-2xl text-gray-300 hover:text-white font-semibold transition-colors duration-300 cursor-pointer relative group"
        >
          Home
          <span className="absolute left-0 -bottom-1 w-0 h-1 rounded bg-green-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          to={"/video"}
          className="text-xl md:text-2xl text-gray-300 hover:text-white font-semibold transition-colors duration-300 cursor-pointer relative group"
        >
          Videos
          <span className="absolute left-0 -bottom-1 w-0 h-1 rounded-lg bg-green-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
