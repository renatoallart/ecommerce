import { GetStaticPropsContext, PreviewData } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { IProduct } from "../..";
import ProductCard from "../../../components/product/ProductCard";
import { getProductByCategory } from "../../../lib/fetches/products";

export default function Category({ products }: { products: IProduct[] }) {
  console.log(products);
  const router = useRouter();
  const { categoryName } = router.query;
  return (
    <section>
      <h3 className="m-6 text-xl font-bold text-white uppercase">
        🌟 {categoryName}
      </h3>
      <div className="flex flex-wrap">
        {products
          .filter((product) => product.category === categoryName)
          .map((product) => (
            <ProductCard key={product.id} isLinkToProduct={true} {...product} />
          ))}
      </div>
    </section>
  );
}

export async function getServerSideProps(
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) {
  const { params } = context;
  const products: String[] = await getProductByCategory(
    String(params?.categoryName)
  );
  if (products.length === 0)
    return {
      notFound: true,
    };

  return {
    props: {
      products,
    },
  };
}
