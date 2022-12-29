import { ShopCartList } from "../../components/shopCart/CartItemsList";
import { CartSummary } from "../../components/shopCart/CartSummary";
import { useLocalStore } from "../../hooks/useLocalStore";
import { IUseShopCartStore, useShopCartStore } from "../../store/shopCartStore";
import Error404 from "../404";

export default function ShopCart() {
  const cart = useLocalStore(
    useShopCartStore,
    (state: IUseShopCartStore) => state.cart
  );
  if (cart.length === 0) return <Error404 />;
  return (
    <section className="flex flex-col p-2 mt-4 ml-4 gap-7 sm:flex-row">
      <ShopCartList />
      <CartSummary />
    </section>
  );
}
