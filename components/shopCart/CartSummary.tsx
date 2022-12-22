import React, { useMemo } from "react";
import { useStore } from "../../hooks/useStore";
import {
  IProduct,
  IUseShopCartStore,
  useShopCartStore,
} from "../../store/shopCartStore";

export function CartSummary() {
  const cart = useStore(
    useShopCartStore,
    (state: IUseShopCartStore) => state.cart
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total: number, product: IProduct) =>
          total + product.price * product.quantity,
        0
      ),
    [cart]
  );
  return (
    <aside className="bg-slate-400 h-44 w-44 sticky top-10 p-4 rounded-md">
      <h3 className="font-xl text-white font-bold">Summary</h3>
      {new Intl.NumberFormat("en-IN").format(cartTotal)},00
    </aside>
  );
}
