import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import { useSession, signIn, signOut } from "next-auth/react";
import { Gear, List, ShoppingCartSimple, SignOut, User } from "phosphor-react";
import Search from "./Search";
import { Menu } from "@mantine/core";

interface INavbarProps {
  setIsShowing: (show: boolean) => void;
}

export default function Navbar({ setIsShowing }: INavbarProps) {
  const { data: session } = useSession();

  const avatar = session?.user?.image;

  // don't forget to fix the menu alignment between items
  return (
    <>
      <nav className="sticky top-0 bg-gray-700 h-11 ">
        <ul className="flex items-center p-2 text-xl font-bold text-white justify-evenly">
          <li className="hidden sm:block">
            <h1>
              <Link href="/" className="cursor-pointer hover:underline">
                My Commerce
              </Link>{" "}
            </h1>
          </li>
          <li className="sm:hidden">
            <List size={30} color="white" onClick={() => setIsShowing(true)} />
          </li>
          <li className="hidden cursor-pointer sm:block hover:underline">
            Categories
          </li>

          <div className="flex items-center w-40 justify-evenly">
            <Link href="/shopCart" className="hidden sm:block">
              <ShoppingCartSimple size={30} color="white " />
            </Link>
            {session ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Image
                    className="rounded-full"
                    src={String(avatar)}
                    width="40"
                    height="40"
                    alt={""}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>User</Menu.Label>
                  <Menu.Item icon={<Gear size={12} color="gray" />}>
                    Settings
                  </Menu.Item>
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
              <Link href="/login">
                <User size={30} color="white" />
              </Link>
            )}
          </div>
        </ul>
        {/* <Search /> */}
      </nav>
    </>
  );
}
