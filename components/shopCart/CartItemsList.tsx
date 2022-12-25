import ProductCard from "../product/ProductCard";
import {
  IProduct,
  IUseShopCartStore,
  useShopCartStore,
} from "../../store/shopCartStore";
import { useStore } from "../../hooks/useStore";
import { ShopCartItem } from "./CartItem";
export function ShopCartList() {
  // in client-only components nextjs can't access localstorage

  //   another way to use localStorage without custom hook
  // const cart = useShopCartStore((state) => state.cart);
  //   const [cartStore, setCartStore] = useState<IProduct[]>([]);
  //   useEffect(() => {
  //     setCartStore(cart);
  //   }, [cart]);
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
  const removeAllProductsFromCart = useShopCartStore(
    (state) => state.removeAllProductsFromCart
  );
  const removeProduct = useShopCartStore((state) => state.removeProductById);
  console.log(crypto.randomUUID());
  return (
    <section className="flex flex-col min-h-full gap-4">
      <div className="rounded-md bg-slate-400">
        <h2 className="text-2xl font-bold ">Shopping Cart</h2>
        <p
          onClick={removeAllProductsFromCart}
          className="mt-2 text-white cursor-pointer"
        >
          Remover all products from the cart
        </p>
      </div>
      <div className="flex flex-col gap-4 ">
        {cartStore.map((product) => (
          <ShopCartItem
            key={product.id}
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
