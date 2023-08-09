import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <Link href="todos">TODOs</Link>
      </div>
    </div>
  );
}
