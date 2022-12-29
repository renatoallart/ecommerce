import React, { ReactNode, useState } from "react";
import { Footer } from "./Footer";
import Navbar from "./Navbar";
import Search from "./Search";

export default function Layout({ children }: { children: ReactNode }) {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <main className="min-h-screen bg-[#121212] debug-screens">
      {isShowing ? (
        <div className="fixed z-10 flex items-center justify-center w-screen h-screen overflow-hidden duration-700 bg-gray-400">
          <p
            onClick={() => setIsShowing(false)}
            className="fixed text-2xl font-semibold text-white duration-300 top-6 right-8 hover:text-amber-500"
          >
            ❌
          </p>
          <div className="flex flex-col space-y-3 text-xl font-light text-center text-white">
            <a className="duration-300 hover:text-amber-500" href="#">
              KindaCode.com
            </a>
            <a className="duration-300 hover:text-amber-500" href="#">
              About Us
            </a>
            <a className="duration-300 hover:text-amber-500" href="#">
              Get In Touch
            </a>
            <a className="duration-300 hover:text-amber-500" href="#">
              Privacy Policy
            </a>
            <a className="duration-300 hover:text-amber-500" href="#">
              Terms of Use
            </a>
          </div>
        </div>
      ) : (
        <>
          {/* <Search /> */}
          <Navbar setIsShowing={setIsShowing} />
          <div className="p-4 ">{children}</div>
        </>
      )}

      <Footer />
    </main>
  );
}
