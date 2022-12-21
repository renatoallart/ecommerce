import ProductCard from "../../components/product/ProductCard";
import { IProduct, useShopCartStore } from "../../store/shopCartStore";
import { useStore } from "../../hooks/useStore";
export default function ShopCart() {
  const cartStore = useStore(useShopCartStore, (state: any) => state.cart);

  //   another way to use localStorage without custom hook
  // const cart = useShopCartStore((state) => state.cart);
  //   const [cartStore, setCartStore] = useState<IProduct[]>([]);
  //   useEffect(() => {
  //     setCartStore(cart);
  //   }, [cart]);
  return (
    <section>
      <div className="min-h-screen">
        {cartStore.map((product) => (
          <ProductCard key={product.id} isLinkToProduct={false} {...product} />
        ))}
      </div>
    </section>
  );
}
