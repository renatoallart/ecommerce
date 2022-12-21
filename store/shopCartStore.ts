import create from "zustand";
import { persist } from "zustand/middleware";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  amount: number;
}

interface IUseShopCartStore {
  cart: IProduct[];
  addProduct(product: IProduct): void;
  removeProduct(productId: number): void;
}

export const useShopCartStore = create<
  IUseShopCartStore,
  [["zustand/persist", IUseShopCartStore]]
>(
  persist(
    (set, get) => ({
      cart: [],
      addProduct: (product: IProduct) =>
        set((state) => ({ cart: [...state.cart, product] })),
      removeProduct: (productId: number) =>
        set((state) => ({
          cart: state.cart.filter((product) => product.id === productId),
        })),
    }),
    {
      name: "cart",
      getStorage: () => sessionStorage,
    }
  )
);
