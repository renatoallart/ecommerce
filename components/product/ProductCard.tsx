import { channel } from "diagnostics_channel";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { IProduct } from "../../pages";

interface IProductCardProps extends IProduct {
  children?: ReactNode;
  isLinkToProduct?: boolean;
}

export default function ProductCard({
  id,
  title,
  price,
  rating,
  thumbnail,
  category,
  isLinkToProduct,
  children,
}: IProductCardProps) {
  const router = useRouter();
  const handleClick = (id: number) => {
    // router.push(
    //   {
    //     pathname: "/product/[product]",
    //     query: { product: id },
    //   },
    //   `/product/${id}?category=${category}`,
    //   { shallow: true }
    // );
  };
  return (
    <div
      className="flex flex-col gap-4 p-2 m-4 text-white rounded-md cursor-pointer h-56 w-44 bg-slate-500"
      onClick={() => (isLinkToProduct ? router.push(`/product/${id}`) : null)}
    >
      <h2 className="text-center overflow-hidden whitespace-nowrap text-ellipsis">
        {title}
      </h2>
      <div className="self-center">
        <Image
          priority
          className="block rounded-md h-28 w-36"
          src={thumbnail}
          alt={title}
          width={500}
          height={264}
        />
      </div>
      <div className="flex justify-between ">
        <p>${price},00</p>
        <p className="text-white">🌟{rating}</p>
      </div>
      {/* {children ? <div>{children}</div> : null} */}
    </div>
  );
}
