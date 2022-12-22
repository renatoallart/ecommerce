import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import ProductCard from "../components/product/ProductCard";
import { getProducts } from "../lib/fetches/products";

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
}

// export default function index({ products }: { products: IProduct[] }) {
export default function Home() {
  const { data: products } = useQuery<IProduct[]>(["products"], getProducts);
  const router = useRouter();
  if (!products) return <div>loading</div>;

  const categories = products
    .map((product) => product.category)
    .filter((product, index, array) => array.indexOf(product) === index);

  const bestProducts = products
    .filter((product) => product.rating >= 4.8)
    .slice(0, 5);

  function handleClick(category: string) {
    router.push(`/product/category/${category}`);
  }
  return (
    <>
      <section>
        <h3 className="m-2 text-xl font-bold text-white uppercase">
          Top 5 Products
        </h3>
        <div className="flex flex-wrap items-center justify-center">
          {bestProducts.map((product) => (
            <ProductCard key={product.id} isLinkToProduct={true} {...product} />
          ))}
        </div>
      </section>
      <section className="flex flex-wrap items-center justify-center gap-4">
        {categories.map((category) => (
          <div key={category} className="flex flex-col ">
            <h3 className="self-start ml-4 text-xl font-bold text-white uppercase">
              🌟 {category}
            </h3>
            <div className="flex flex-wrap items-center justify-center">
              {products
                .filter((product) => product.category === category)
                .slice(0, 3)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    isLinkToProduct={true}
                    {...product}
                  />
                ))}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-xl font-bold text-white uppercase m-">
          Departments
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2 p-2">
          {categories.map((category) => {
            // get the first product of witch category
            const departments = products.filter(
              (product) => product.category === category
            )[0];
            return (
              <div
                onClick={() => handleClick(category)}
                key={category}
                className="flex flex-col items-center justify-center flew-wrap hover:bg-zinc-600 hover:rounded-md hover:skew-y-12"
              >
                <h4 className="p-2 text-xs font-bold text-white uppercase ">
                  🌟 {category}
                </h4>
                <ProductCard isLinkToProduct={false} {...departments} />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  // const products = await getProducts();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["products", getProducts]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
