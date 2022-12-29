import { useRouter } from "next/router";
import { IProduct } from "../../interfaces/Product";
import { handleClick } from "../../lib/utils/redirectToCategory";
import { ProductCard } from "./ProductCard";

export function AllCategories({ products }: { products: IProduct[] }) {
  const categories = products
    .map((product) => product.category)
    .filter((product, index, array) => array.indexOf(product) === index);

  const router = useRouter();
  return (
    <section>
      <h3 className="text-xl font-bold text-white uppercase m-">Categories</h3>
      <div className="flex flex-wrap items-center justify-center gap-2 p-2">
        {categories.map((category) => {
          // get the first product of each category
          const departments = products.filter(
            (product) => product.category === category
          )[0];
          return (
            <div
              onClick={() => handleClick(category, router)}
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
  );
}
