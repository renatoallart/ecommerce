import { ReactNode, useState } from "react";
import { Footer } from "./Footer";
import Navbar from "./Navbar";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="p-4 debug-screens bg-[#121212]">{children}</main>
      <Footer />
    </>
  );
}
