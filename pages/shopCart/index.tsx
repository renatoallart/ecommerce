import { ShopCartList } from "../../components/shopCart/CartItemsList";
import { CartSummary } from "../../components/shopCart/CartSummary";
import { useStore } from "../../hooks/useStore";
import { IUseShopCartStore, useShopCartStore } from "../../store/shopCartStore";
import Error404 from "../404";

export default function ShopCart() {
  const cart = useStore(
    useShopCartStore,
    (state: IUseShopCartStore) => state.cart
  );
  if (cart.length === 0) return <Error404 />;
  return (
    <section className="flex justify-center p-2 m-4 gap-7 ">
      <ShopCartList />
      <CartSummary />
    </section>
  );
}
