import Image from "next/image";
import React from "react";
import cat from "../../public/cat.gif";

export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] gap-4">
      <Image src={cat} width={400} height={400} alt={""} />
      <p className="text-2xl font-bold text-white"> Loading...</p>
    </div>
  );
}
