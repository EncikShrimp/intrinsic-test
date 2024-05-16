"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, []);
  return (
    <main className="dark flex min-h-screen flex-col items-center justify-between p-24">
      HOME
    </main>
  );
}
