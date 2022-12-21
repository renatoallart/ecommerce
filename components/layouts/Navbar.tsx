import Link from "next/link";
import React from "react";
import Image from "next/image";

import { useSession, signIn, signOut } from "next-auth/react";
import { ShoppingCartSimple, User } from "phosphor-react";

export default function Navbar() {
  const { data: session } = useSession();

  const avatar = session?.user?.image;

  return (
    <nav className="flex items-center justify-center h-16 bg-gray-700">
      <ul className="flex gap-6 text-xl font-bold text-white">
        <li className="hover:underline hover:decoration-white ">
          <Link href="/">Products</Link>
        </li>
        <li className="hover:underline hover:decoration-white ">
          <Link href="/shopCart">
            <ShoppingCartSimple size={40} color="white" />
          </Link>
        </li>

        {session ? (
          <li className="hover:underline hover:decoration-white">
            <Link
              href="/api/auth/signout"
              onClick={(event) => {
                event.preventDefault();
                signOut({ callbackUrl: "/" });
              }}
            >
              <Image
                className="rounded-full"
                src={String(avatar)}
                width="40"
                height="40"
                alt={""}
              />
            </Link>
          </li>
        ) : (
          <li className="hover:underline hover:decoration-white">
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
