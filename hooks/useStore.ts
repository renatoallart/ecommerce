import { useState, useEffect } from "react";
import { IProduct } from "../store/shopCartStore";

export function useStore(store: any, callback: any) {
  const result = store(callback);
  const [state, setState] = useState<IProduct[]>([]);

  useEffect(() => {
    setState(result);
  }, [result]);
  return state;
}
