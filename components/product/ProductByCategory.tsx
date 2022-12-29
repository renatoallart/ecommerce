import React from "react";
import { IProduct } from "../../interfaces/Product";
import { ProductCard } from "./ProductCard";

interface IProductByCategoryProps {
  productList: IProduct[];
  category: string;
  slice: number;
}

export function ProductByCategory({
  productList,
  category,
  slice,
}: IProductByCategoryProps) {
  return (
    <>
      {productList
        .filter((product) => product.category === category)
        .slice(0, slice)
        .map((product) => (
          <ProductCard key={product.id} isLinkToProduct={true} {...product} />
        ))}
    </>
  );
}
