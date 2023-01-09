import { IUseShopCartStore, useShopCartStore } from "../../store/shopCartStore";
import { useLocalStore } from "../../hooks/useLocalStore";
import { CartItem } from "./CartItem";
import { Trash } from "phosphor-react";

export function ShopCartList() {
  // in client-only components nextjs can't access localStorage

  //   another way to use localStorage without custom hook
  // const cart = useShopCartStore((state) => state.cart);
  //   const [cartStore, setCartStore] = useState<IProduct[]>([]);
  //   useEffect(() => {
  //     setCartStore(cart);
  //   }, [cart]);
  const cartStore = useLocalStore(
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
  // console.log(crypto.randomUUID());
  return (
    <section className="flex flex-col min-h-full gap-4">
      <div className="p-4 rounded-md bg-slate-400">
        <h2 className="text-2xl font-bold text-center ">Shopping Cart</h2>
        <div className="flex mt-2 p-2 items-center justify-center gap-6 border-t-[1px] border-gray-500">
          <p className="text-white ">Remover all products </p>
          <Trash
            className="cursor-pointer"
            onClick={removeAllProductsFromCart}
            size={30}
            color="red"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 ">
        {cartStore.map((product) => (
          <CartItem
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
