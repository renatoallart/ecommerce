import create from "zustand";
import { persist } from "zustand/middleware";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  quantity: number;
}

export interface IUseShopCartStore {
  cart: IProduct[];
  addProduct(product: IProduct): void;
  removeProduct(productId: number): void;
  decreaseQuantityByOne(productId: number): void;
  increaseQuantityByOne(productId: number): void;
}

export const useShopCartStore = create<
  IUseShopCartStore,
  [["zustand/persist", IUseShopCartStore]]
>(
  persist(
    (set, get) => ({
      cart: [],
      addProduct: (product: IProduct) => {
        set((state) => ({ cart: [product, ...state.cart] }));
      },
      removeProduct: (productId: number) =>
        set((state) => ({
          cart: state.cart.filter((product) => product.id !== productId),
        })),
      decreaseQuantityByOne: (productId: number) =>
        set((state) => ({
          cart: state.cart.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  quantity: product.quantity === 1 ? 1 : product.quantity - 1,
                }
              : product
          ),
        })),
      increaseQuantityByOne: (productId: number) =>
        set((state) => ({
          cart: state.cart.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  quantity: product.quantity >= 1 ? product.quantity + 1 : 1,
                }
              : product
          ),
        })),
    }),
    {
      name: "cart",
      getStorage: () => sessionStorage,
    }
  )
);
