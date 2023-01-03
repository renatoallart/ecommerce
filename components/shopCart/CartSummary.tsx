import React, { useMemo } from "react";
import { useLocalStore } from "../../hooks/useLocalStore";
import { IProductCart } from "../../interfaces/productsCart";
import { IUseShopCartStore, useShopCartStore } from "../../store/shopCartStore";

export function CartSummary() {
  const cart = useLocalStore(
    useShopCartStore,
    (state: IUseShopCartStore) => state.cart
  );

  // const cart = useShopCartStore((state: IUseShopCartStore) => state.cart)

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total: number, product: IProductCart) =>
          total + product.price * product.quantity,
        0
      ),
    [cart]
  );
  return (
    <aside className="sticky p-4 rounded-md bg-slate-400 h-44 w-44 top-10">
      <h3 className="font-bold text-white font-xl">Summary</h3>
      {new Intl.NumberFormat("en-IN").format(cartTotal)},00
    </aside>
  );
}
