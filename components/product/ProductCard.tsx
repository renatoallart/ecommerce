import Image from "next/image";
import { useRouter } from "next/router";
import { IProduct } from "../../interfaces/Product";
import { formatToCurrency } from "../../lib/utils/formatData";

interface IProductCardProps extends IProduct {
  isLinkToProduct?: boolean;
}

export function ProductCard({
  id,
  title,
  price,
  rating,
  thumbnail,
  category,
  isLinkToProduct,
}: IProductCardProps) {
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(
      {
        pathname: "/product/[product]",
        query: { product: id },
      },
      `/product/${id}?category=${category}`,
      { shallow: true }
    );
  };

  return (
    <div
      className="flex flex-col h-56 gap-4 p-2 m-4 text-white rounded-md cursor-pointer w-44 bg-slate-500"
      onClick={() => (isLinkToProduct ? handleClick(id) : null)}
    >
      <h2 className="overflow-hidden text-center whitespace-nowrap text-ellipsis">
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
        <p>${formatToCurrency(price)}</p>
        <p className="text-white">🌟{rating}</p>
      </div>
      {/* {children ? <div>{children}</div> : null} */}
    </div>
  );
}
