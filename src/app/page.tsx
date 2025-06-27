'use client';

import { useEffect } from "react";
import Home from "@/(pages)/Home";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

export default function Page() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

    if (user && user.id) {
      router.push("/explore");
    }




  return (
    <div>
      <Home />
    </div>
  );
}
