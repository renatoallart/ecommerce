import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Gear, ShoppingCartSimple, SignOut, User } from "phosphor-react";
import { Menu } from "@mantine/core";
import { IUseShopCartStore, useShopCartStore } from "../../store/shopCartStore";
import { useLocalStore } from "../../hooks/useLocalStore";

export function Navbar() {
  const { data: session } = useSession();
  const cart = useLocalStore(
    useShopCartStore,
    (state: IUseShopCartStore) => state.cart
  );

  const avatar = session?.user?.image;

  // don't forget to fix the menu alignment between items
  return (
    <>
      <nav className="sticky top-0 z-10 bg-gray-700 h-11">
        <ul className="grid grid-cols-2 gap-4 p-1 text-white sm:grid sm:grid-cols-3">
          <h1 className="hidden sm:grid sm:place-content-center">
            <Link
              href="/"
              className="text-xl font-bold cursor-pointer font-rubik hover:underline"
            >
              My E-Commerce
            </Link>
          </h1>
          <li className="text-xl font-bold cursor-pointer place-self-center sm:block hover:underline">
            <Link href="/category">Categories</Link>
          </li>
          <div className="grid place-content-center">
            <div className="flex items-center w-32 justify-evenly">
              <div className="hidden md:flex ">
                <Link href="/shopCart" className="hidden sm:block ">
                  <ShoppingCartSimple size={30} color="white " />
                </Link>
                {cart.length > 0 ? (
                  <p className="relative bg-orange-400 rounded-[50%] -top-1 right-1 font-bold h-4 w-4 text-center text-xs">
                    {cart.length}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="rounded-full cursor-pointer hover:shadow-md hover:shadow-white">
                {session ? (
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <Image
                        className="rounded-full "
                        src={String(avatar)}
                        width="30"
                        height="30"
                        alt={""}
                      />
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Label>User</Menu.Label>
                      {/* <Menu.Item icon={<Gear size={12} color="gray" />}>
                        Settings
                      </Menu.Item> */}
                      <Menu.Item
                        icon={<SignOut size={16} color="red" />}
                        onClick={(event) => {
                          console.log("clicked => signout");
                          // event.preventDefault();
                          signOut({ callbackUrl: "/" });
                        }}
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                ) : (
                  <Link href="/login" className="rounded-full ">
                    <User size={30} color="white" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </ul>
      </nav>
    </>
  );
}
