import Image from "next/image";
import { useRouter } from "next/router";

interface IShopCartItemProps {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  category: string;
  decreaseQuantityByOne(productId: number): void;
  increaseQuantityByOne(productId: number): void;
  removeProduct(productId: number): void;
}

export function ShopCartItem({
  id,
  title,
  price,
  thumbnail,
  quantity,
  category,
  increaseQuantityByOne,
  decreaseQuantityByOne,
  removeProduct,
}: IShopCartItemProps) {
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
    <div className="flex gap-4 p-4 rounded-md h-36 w-96 bg-slate-400">
      <Image
        onClick={() => handleClick(id)}
        className="self-center cursor-pointer h-28 w-22"
        priority
        src={thumbnail}
        alt={title}
        width={500}
        height={60}
      />

      <div className="flex flex-col text-white rounded-md h-min w-60 ">
        <h2
          onClick={() => handleClick(id)}
          className="p-1 overflow-hidden text-center cursor-pointer whitespace-nowrap text-ellipsis hover:bg-slate-500 hover:rounded-md"
        >
          {title}cmewicmoiwemcioewmcioewmcioewmciowemciomewoicwe
        </h2>
        <p
          onClick={() => router.push(`/product/category/${category}`)}
          className="p-1 text-sm font-bold text-center text-white cursor-pointer w-min hover:bg-slate-500 hover:rounded-md"
        >
          {category}
        </p>
        <div className="flex items-center justify-between p-1">
          <p className="text-sm text-white">R$ {price},00</p>
          <div className="flex gap-2 mr-4">
            <button onClick={() => decreaseQuantityByOne(id)}>-</button>
            <p>{quantity}</p>
            <button onClick={() => increaseQuantityByOne(id)}>+</button>
          </div>
        </div>
        <button
          className="mr-4 text-center hover:bg-slate-500 hover:rounded-md"
          onClick={() => removeProduct(id)}
        >
          remover
        </button>
      </div>
    </div>
  );
}
