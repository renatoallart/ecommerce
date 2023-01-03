import { useState, useEffect } from "react";
import { IProductCart } from "../interfaces/productsCart";

// solution to access localStorage in Client-only components
// using Zustand

export function useLocalStore(store: any, callback: any): IProductCart[] {
  const result = store(callback);
  const [state, setState] = useState<IProductCart[]>([]);

  useEffect(() => {
    setState(result);
  }, [result]);
  return state;
}
