import { GetStaticPropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getProductById, getProducts } from "../../lib/fetches/products";
import { useShopCartStore } from "../../store/shopCartStore";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ProductByCategory } from "../../components/product/ProductByCategory";
import { handleClick } from "../../lib/utils/redirectToCategory";
import { ImageCarousel } from "../../components/product/ImageCarousel";
import { IProduct } from "../../interfaces/Product";
import Error404 from "../404";
import { formatToCurrency } from "../../lib/utils/formatData";
import { Carousel } from "@mantine/carousel";
import { Loading } from "../../components/layouts/Loading";

export default function Product() {
  const router = useRouter();
  const { productId } = router.query;
  const { data: product, isLoading } = useQuery<IProduct>(
    ["product", productId],
    () => getProductById(Number(productId))
  );
  const addProduct = useShopCartStore((state) => state.addProduct);
  function handleAddProduct(product: IProduct, productId: number) {
    addProduct(
      {
        ...product,
        quantity: 1,
      },
      productId
    );
  }

  const { data: similarProducts, isLoading: isLoadingProducts } = useQuery<
    IProduct[]
  >(["similarProducts"], getProducts);

  if (isLoading) return <Loading />;

  if (!product) return <Error404 />;

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4">
        <div className="mt-4 md:gap-4 md:flex md:flex-row md:justify-center md:items-center">
          <div>
            <ImageCarousel images={product.images} title={product.title} />
          </div>
          <aside>
            <div className=" p-2 w-[400px] bg-slate-400">
              <p className="text-xl font-bold text-white">
                Price: $ <span>{formatToCurrency(product.price)}</span>
              </p>
              <p>{product.description}</p>
            </div>
            <button
              onClick={() => handleAddProduct(product, Number(productId))}
              className="w-full mt-4 font-bold text-white h-11 bg-slate-400 hover:text-green-600"
            >
              Add to Cart
            </button>
          </aside>
        </div>
      </section>

      {/* render Similar Products */}
      <section>
        {isLoadingProducts && !similarProducts ? (
          <Loading />
        ) : (
          <div>
            <div className="flex m-4 justify-evenly">
              <h3 className="font-bold text-white ">Similar Products</h3>
              <h3
                onClick={() => handleClick(product.category, router)}
                className="font-bold text-white cursor-pointer hover:text-slate-500"
              >
                See more...
              </h3>
            </div>
            <div className="flex flex-wrap items-center justify-center">
              {similarProducts ? (
                <ProductByCategory
                  productList={similarProducts}
                  category={product?.category}
                  slice={4}
                />
              ) : (
                <Error404 />
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) {
  // const { params } = context;
  // console.log("params => ", params?.productId);
  // const product = await getProductById(Number(params?.productId));
  // if (!product)
  //   return {
  //     notFound: true,
  //   };

  // return {
  //   props: { product },
  //   revalidate: 60 * 10,
  // };
  const { params } = context;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["product", params?.productId], () =>
    getProductById(Number(params?.productId))
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export async function getStaticPaths() {
  const products: IProduct[] = await getProducts();
  const paths = products.map((product) => ({
    params: {
      productId: String(product.id),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}
