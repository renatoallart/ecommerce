import { GetStaticPropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getProductById } from "../../lib/fetches/products";
import { getProducts } from "../../lib/fetches/products";
import { IProduct } from "../index";
import Error404 from "../404";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import { useShopCartStore } from "../../store/shopCartStore";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function Product() {
  const router = useRouter();
  const { productId } = router.query;
  const { data: product, isLoading } = useQuery<IProduct>(
    ["product", productId],
    () => getProductById(Number(productId))
  );
  const addProduct = useShopCartStore((state) => state.addProduct);

  function handleAddProduct({
    id,
    brand,
    category,
    price,
    rating,
    stock,
    thumbnail,
    title,
    description,
  }: IProduct) {
    addProduct({
      id,
      title,
      price,
      rating,
      thumbnail,
      category,
      quantity: 1,
      brand,
      description,
      stock,
    });
  }
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (!product) return <Error404 />;

  return (
    <section>
      <h1 className="text-white ">{product.title}</h1>
      <Carousel
        sx={{ maxWidth: 400 }}
        mx="auto"
        withIndicators
        height={220}
        dragFree
        slideGap="md"
        align="start"
        styles={{
          indicator: {
            width: 30,
            height: 13,
            color: "red",
            transition: "width 250ms ease",
            "&[data-active]": {
              width: 90,
            },
          },
        }}
      >
        {product.images.map((image) => (
          <Carousel.Slide key={image}>
            <Image
              className="w-[400px] h-60"
              src={image}
              alt={product.title}
              fill
            />
          </Carousel.Slide>
        ))}
      </Carousel>
      <p>{product.description}</p>
      <button
        onClick={() => handleAddProduct(product)}
        className="font-bold text-white "
      >
        Add to Cart
      </button>
    </section>
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
