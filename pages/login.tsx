import { signIn } from "next-auth/react";

export default function login() {
  return (
    <div>
      <h2 className="text-xl text-center">Login With GitHub</h2>
      <button
        className="block text-xl bg-green-500 w-26 h-26 "
        onClick={(event) => {
          event.preventDefault();
          signIn("github", { callbackUrl: "http://localhost:3000/" });
        }}
      >
        Sing In
      </button>
    </div>
  );
}
