import { ShopCartList } from "../../components/shopCart/CartItemsList";
import { CartSummary } from "../../components/shopCart/CartSummary";
import EmptyCart from "../../components/shopCart/EmptyCart";
import { useLocalStore } from "../../hooks/useLocalStore";
import { IUseShopCartStore, useShopCartStore } from "../../store/shopCartStore";
import Error404 from "../404";

export default function ShopCart() {
  const cart = useLocalStore(
    useShopCartStore,
    (state: IUseShopCartStore) => state.cart
  );
  if (cart.length === 0) return <EmptyCart />;
  return (
    // <section className="flex flex-col items-center justify-center w-screen gap-2 md:items-start md:flex md:flex-row md:justify-center">
    <section className="flex flex-col items-center gap-4 p-2 md:flex md:flex-row md:justify-center md:items-start">
      <ShopCartList />
      <CartSummary />
    </section>
  );
}
