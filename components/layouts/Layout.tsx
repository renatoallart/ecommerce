import Head from "next/head";
import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>My Commerce</title>
      </Head>
      {/* <div className=" min-h-screen debug-screens grid grid-rows-layout bg-[#121212] min-w-full "> */}
      <div className=" min-h-screen grid grid-rows-layout bg-[#121212] min-w-full ">
        <Navbar />
        <main className="min-w-[90vw]">{children}</main>
        <Footer />
      </div>
    </>
  );
}
