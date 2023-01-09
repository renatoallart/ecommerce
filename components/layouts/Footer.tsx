import Link from "next/link";
import { House, ShoppingCartSimple } from "phosphor-react";
import React from "react";
import { useLocalStore } from "../../hooks/useLocalStore";
import { useShopCartStore, IUseShopCartStore } from "../../store/shopCartStore";

export function Footer() {
  const cart = useLocalStore(
    useShopCartStore,
    (state: IUseShopCartStore) => state.cart
  );
  return (
    <footer className="sticky bottom-0 self-end p-2 bg-gray-700 h-11 md:hidden">
      <nav>
        <ul className="flex text-white justify-evenly">
          <Link href="/">
            <House size={30} color="white" />
          </Link>

          <div className="flex">
            <Link href="/shopCart">
              <ShoppingCartSimple size={30} color="white" />
            </Link>
            {cart.length > 0 ? (
              <p className="relative font-bold bg-orange-400 rounded-[50%] -top-1 right-1 h-4 w-4 text-center text-xs">
                {cart.length}
              </p>
            ) : (
              ""
            )}
          </div>
        </ul>
      </nav>
    </footer>
  );
}
