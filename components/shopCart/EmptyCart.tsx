import React from "react";
import { ShoppingCartSimple } from "phosphor-react";
import Link from "next/link";
export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h2 className="text-2xl font-bold text-white">Ur cart is empty!</h2>
      <div className="flex justify-center w-56 gap-4 p-2 rounded-md cursor-pointer bg-slate-400">
        <ShoppingCartSimple size={30} color="white" />
        <Link href="/" className="font-bold">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
