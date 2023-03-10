import create from "zustand";
import { persist } from "zustand/middleware";
import { IProductCart } from "../interfaces/productsCart";

export interface IUseShopCartStore {
  cart: IProductCart[];
  addProduct(product: IProductCart, productId: number): void;
  removeProductById(productId: number): void;
  decreaseQuantityByOne(productId: number): void;
  increaseQuantityByOne(productId: number): void;
  removeAllProductsFromCart(): void;
}

export const useShopCartStore = create<
  IUseShopCartStore,
  [["zustand/persist", IUseShopCartStore]]
>(
  persist(
    (set, get) => ({
      cart: [],
      addProduct: (product: IProductCart, productId: number) => {
        if (get().cart.find((product) => product.id === productId)) {
          return console.log("product in list");
        }

        set((state) => ({ cart: [product, ...state.cart] }));
      },
      removeProductById: (productId: number) =>
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
      removeAllProductsFromCart: () => set(() => ({ cart: [] })),
    }),
    {
      name: "cart",
      getStorage: () => localStorage,
    }
  )
);
