import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { Loading } from "../components/layouts/Loading";
import { AllCategories } from "../components/product/AllCategories";
import { ProductList } from "../components/product/ProductList";
import { Top5 } from "../components/product/Top5";
import { IProduct } from "../interfaces/Product";
import { getProducts } from "../lib/fetches/products";

export default function Home() {
  const { data: products } = useQuery<IProduct[]>(["products"], getProducts);

  if (!products) return <Loading />;

  return (
    <>
      {/* // render the top 5 products  */}
      <Top5 productList={products} />

      {/* // render all category and some products related */}
      <ProductList products={products} />

      {/* // render the first product of each category */}
      <AllCategories products={products} />
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["products", getProducts]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
