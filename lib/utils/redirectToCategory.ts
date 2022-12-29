import { NextRouter } from "next/router";

export function handleClick(category: string, router: NextRouter) {
  router.push(`/product/category/${category}`);
}
