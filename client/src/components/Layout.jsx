import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full flex flex-col items-center justify-center p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
