import Image from "next/image";

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
  console.log("quantity => ", quantity);
  return (
    <div className=" h-36 p-4 bg-slate-400 flex gap-4">
      <Image
        className=" h-24 w-24"
        src={thumbnail}
        alt={title}
        width={900}
        height={60}
      />
      <div className="">
        <h2 className="text-xl text-white font-bold">{title}</h2>
        <p className="text-xl text-white font-bold">{category}</p>
        <div>
          <p>R$ {price},00</p>
          <div className="flex gap-2">
            <button onClick={() => decreaseQuantityByOne(id)}> - </button>
            <p>{quantity}</p>
            <button onClick={() => increaseQuantityByOne(id)}> + </button>
            <button
              onClick={() => removeProduct(id)}
              className=" p-[4px] cursor-pointer hover:bg-slate-600 hover:text-black transition-all block text-white font-bold text-center bg-slate-400  rounded-md "
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
