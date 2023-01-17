import React, { useMemo } from "react";
import { useLocalStore } from "../../hooks/useLocalStore";
import { IProductCart } from "../../interfaces/productsCart";
import { formatToCurrency } from "../../lib/utils/formatData";
import { IUseShopCartStore, useShopCartStore } from "../../store/shopCartStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function CartSummary() {
  const { data: session } = useSession();
  const router = useRouter();
  const cart = useLocalStore(
    useShopCartStore,
    (state: IUseShopCartStore) => state.cart
  );

  function handleCheckout() {
    if (!session) return router.push("/login");
    return alert("successful order");
  }

  // const cart = useShopCartStore((state: IUseShopCartStore) => state.cart)

  const totalPrice = useMemo(() => {
    return formatToCurrency(
      cart.reduce(
        (total: number, product: IProductCart) =>
          total + product.price * product.quantity,
        0
      )
    );
  }, [cart]);
  const quantity = useMemo(
    () =>
      cart.reduce(
        (totalQuantity: number, productQuantity: IProductCart) =>
          totalQuantity + productQuantity.quantity,
        0
      ),
    [cart]
  );
  return (
    <aside className="h-48 w-[430px] md:sticky md:top-14  bg-slate-400 p-3 rounded-md">
      <h3 className="text-2xl font-bold text-white">Summary</h3>
      <div className="flex flex-col gap-2 mt-2 ">
        <div className="flex items-baseline justify-evenly ">
          <p className="text-sm text-white ">Subtotal</p>
          <p className="text-white">${totalPrice}</p>
        </div>

        <div className="flex items-baseline justify-evenly ">
          <p className="text-2xl text-white ">Total</p>
          <p className="text-xl font-bold text-white">${totalPrice}</p>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full h-12 mt-2 text-xl font-bold bg-green-500"
      >
        Checkout ( {quantity} )
      </button>
    </aside>
  );
}
