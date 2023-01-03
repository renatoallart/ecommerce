import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import React from "react";
import { AllCategories } from "../../components/product/AllCategories";
import { IProduct } from "../../interfaces/Product";
import { getProducts } from "../../lib/fetches/products";

export default function Category() {
  const { data: products, isLoading } = useQuery<IProduct[]>(
    ["categories"],
    getProducts
  );
  if (isLoading) return <div>loading</div>;
  if (!products) return <div>Page not found</div>;
  return (
    <>
      {/* // render the first product of each category */}
      <AllCategories products={products} />
    </>
  );
}

export async function GetStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["categories", getProducts]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
