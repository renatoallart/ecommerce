import { signIn } from "next-auth/react";
import Link from "next/link";
import { authArray } from "../lib/utils/authArray";

export default function Login() {
  return (
    <section className="min-h-screen debug-screens bg-[#121212]">
      <div className="flex flex-col items-center justify-center h-screen gap-4 bg-slate-400 ">
        <div>
          <Link href="/">
            <h2 className="font-bold text-white cursor-pointer text-7xl">
              <p className="text-center">My</p> <p>Commerce</p>
            </h2>
          </Link>
        </div>
        {authArray.map((auth) => (
          <div
            key={auth.label}
            className=" cursor-pointer flex items-center justify-evenly gap-4 border-black border-[1px] p-2 w-96 h-11 hover:shadow-md hover:shadow-white"
            onClick={(event) => {
              event.preventDefault();
              signIn(auth.label, { callbackUrl: "http://localhost:3000/" });
            }}
          >
            <p className="text-xl font-bold text-white">
              Login with {auth.label}
            </p>
            <p>{<auth.icon size={22} color="white" />}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

Login.getLayout = function PageLayout(page: JSX.Element) {
  return <>{page}</>;
};
