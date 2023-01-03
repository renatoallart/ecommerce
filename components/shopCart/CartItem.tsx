import Image from "next/image";
import { useRouter } from "next/router";
import { formatToCurrency } from "../../lib/utils/formatData";

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

export function CartItem({
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
        className="self-center rounded-md cursor-pointer h-28 w-22"
        priority
        src={thumbnail}
        alt={title}
        width={500}
        height={60}
      />

      <div className="flex flex-col overflow-hidden text-white rounded-md h-min w-60 ">
        <h2
          onClick={() => handleClick(id)}
          className="p-[2px] overflow-hidden font-bold cursor-pointer whitespace-nowrap text-ellipsis hover:bg-slate-500 hover:rounded-md"
        >
          {title}
        </h2>
        <p
          onClick={() => router.push(`/product/category/${category}`)}
          className="p-[2px] overflow-hidden text-[4xp] text-white cursor-pointer whitespace-nowrap text-ellipsis w-min hover:bg-slate-500 hover:rounded-md"
        >
          {category}
        </p>

        {/* // increase and decrease quantity  */}
        <div className="flex items-center justify-between ">
          <p className="text-[14px] text-white">${formatToCurrency(price)}</p>
          <div className="flex items-center justify-center gap-2 ">
            <button
              className="w-6 h-6 text-center rounded-full hover:bg-red-500 hover:border hover:border-black"
              onClick={() => decreaseQuantityByOne(id)}
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              className="w-6 h-6 text-center rounded-full hover:bg-green-500 hover:border hover:border-black"
              onClick={() => increaseQuantityByOne(id)}
            >
              +
            </button>
          </div>
        </div>
        <button
          className="text-center hover:bg-slate-500 hover:rounded-md"
          onClick={() => removeProduct(id)}
        >
          remover
        </button>
      </div>
    </div>
  );
}
