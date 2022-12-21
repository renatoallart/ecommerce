import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Search from "./Search";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#121212] debug-screens">
      <Navbar />
      <Search />
      {children}
    </main>
  );
}
