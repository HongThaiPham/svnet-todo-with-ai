import { signInAction } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">
        Welcome to my Next.js + Tailwind CSS + TypeScript project!
      </h1>
      <Image src="/logo.svg" alt="logo" width={200} height={200} />
      <form action={signInAction}>
        <Button>Click me!</Button>
      </form>
    </main>
  );
}
