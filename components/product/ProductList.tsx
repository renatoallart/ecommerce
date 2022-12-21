import React from "react";
// import ProductCard from "../../components/product/ProductCard";
// import { getProducts } from "../../lib/fetches/products";

// export interface IProductList {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   discountPercentage: number;
//   rating: number;
//   stock: number;
//   brand: string;
//   category: string;
//   thumbnail: string;
//   images: string[];
// }

// export default function ProductList({
//   products,
// }: {
//   products: IProductList[];
// }) {
//   const categories = products
//     .map((product) => product.category)
//     .filter((product, index, array) => array.indexOf(product) === index);

//   return (
//     <section className="flex flex-wrap gap-4">
//       {categories.map((category) => (
//         <div>
//           <h2 className="m-6 text-xl font-bold text-white uppercase">
//             🌟 {category}
//           </h2>
//           <div className="flex flex-wrap">
//             {products
//               .filter((product) => product.category === category)
//               .map((product) => (
//                 <ProductCard key={product.id} {...product} />
//               ))}
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// }

// export async function getServerSideProps() {
//   const products = await getProducts();

//   return {
//     props: {
//       products,
//     },
//   };
// }
