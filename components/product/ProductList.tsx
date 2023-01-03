import { IProduct } from "../../interfaces/Product";
import { ProductByCategory } from "./ProductByCategory";

export function ProductList({ products }: { products: IProduct[] }) {
  const categories = products
    .map((product) => product.category)
    .filter((product, index, array) => array.indexOf(product) === index);

  return (
    <section className="flex flex-wrap items-center justify-center gap-4">
      {categories.map((category) => (
        <div key={category} className="flex flex-col ">
          <h3 className="self-start ml-4 text-xl font-bold text-white uppercase">
            🌟 {category}
          </h3>
          <div className="flex flex-wrap items-center justify-center">
            <ProductByCategory
              slice={3}
              productList={products}
              category={category}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
