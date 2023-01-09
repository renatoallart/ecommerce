import React from "react";
import { IProduct } from "../../interfaces/Product";
import { ProductCard } from "./ProductCard";

export function Top5({ productList }: { productList: IProduct[] }) {
  const bestProducts = productList
    .filter((product) => product.rating >= 4.8)
    .slice(0, 5);
  return (
    <section>
      <h3 className="p-2 text-xl font-bold text-white uppercase ">
        Top 5 Products
      </h3>
      <div className="flex flex-wrap items-center justify-center">
        {bestProducts.map((product) => (
          <ProductCard key={product.id} isLinkToProduct={true} {...product} />
        ))}
      </div>
    </section>
  );
}
