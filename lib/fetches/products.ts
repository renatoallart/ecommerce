import axios from "axios";

export async function getProducts() {
  // const response = await fetch("https://dummyjson.com/products?limit=100");
  // const data = await response.json();
  // return data.products;
  const { data } = await axios.get("https://dummyjson.com/products?limit=100");
  return data.products;
}

export async function getProductById(id: number) {
  // const response = await fetch(`https://dummyjson.com/products/${id}`);
  // const data = await response.json();
  // return data;
  const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
  return data;
}

export async function getProductByCategory(category: string) {
  // const response = await fetch(
  //   `https://dummyjson.com/products/category/${category}`
  // );
  // const data = await response.json();
  // return data.products;
  const { data } = await axios.get(
    `https://dummyjson.com/products/category/${category}`
  );
  return data.products;
}
