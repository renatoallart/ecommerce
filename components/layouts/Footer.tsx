import Link from "next/link";
import { House, ShoppingCartSimple } from "phosphor-react";
import React from "react";

export function Footer() {
  return (
    <footer className="sticky bottom-0 p-2 bg-gray-700 h-11 md:hidden">
      <nav>
        <ul className="flex text-white justify-evenly">
          <button>
            <Link href="/">
              <House size={30} color="white" />
            </Link>
          </button>
          <button>
            <Link href="/shopCart">
              <ShoppingCartSimple size={30} color="white" />
            </Link>
          </button>
        </ul>
      </nav>
    </footer>
  );
}
