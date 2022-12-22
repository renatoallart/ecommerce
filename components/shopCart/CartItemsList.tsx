import ProductCard from "../product/ProductCard";
import {
  IProduct,
  IUseShopCartStore,
  useShopCartStore,
} from "../../store/shopCartStore";
import { useStore } from "../../hooks/useStore";
import { ShopCartItem } from "./CartItem";
export function ShopCartList() {
  const cartStore = useStore(
    useShopCartStore,
    (state: IUseShopCartStore) => state.cart
  );
  const decreaseQuantityByOne = useShopCartStore(
    (state) => state.decreaseQuantityByOne
  );
  const increaseQuantityByOne = useShopCartStore(
    (state) => state.increaseQuantityByOne
  );
  const removeProduct = useShopCartStore((state) => state.removeProduct);
  //   another way to use localStorage without custom hook
  // const cart = useShopCartStore((state) => state.cart);
  //   const [cartStore, setCartStore] = useState<IProduct[]>([]);
  //   useEffect(() => {
  //     setCartStore(cart);
  //   }, [cart]);
  return (
    <section className="min-h-full flex flex-col gap-4 m-4 p-4">
      <div className=" flex flex-col gap-4">
        {cartStore.map((product) => (
          <ShopCartItem
            removeProduct={removeProduct}
            decreaseQuantityByOne={decreaseQuantityByOne}
            increaseQuantityByOne={increaseQuantityByOne}
            {...product}
          />
        ))}
      </div>
    </section>
  );
}
