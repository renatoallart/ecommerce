import { useRouter } from "next/router";
import React, { FormEvent, useRef, useState } from "react";

export default function Search() {
  const router = useRouter();
  const productRef = useRef<HTMLInputElement>(null);

  function pushRouter() {
    if (!productRef.current) return null;
    router.push(
      `/product/category/${productRef.current.value.trim().toLowerCase()}`
    );
    productRef.current.value = "";
  }
  return (
    <div>
      <label htmlFor="productName"></label>
      <input
        ref={productRef}
        id="productName"
        type="text"
        placeholder="Search by category"
      />
      <button onClick={pushRouter} className="text-xl text-white bg-slate-500">
        Search
      </button>
    </div>
  );
}
