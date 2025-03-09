"use client";

import { useRouter } from "next/navigation";
import FixedButton from "@/components/Button/FixedButton/FixedButton";

export default function ClientButton() {
  const router = useRouter();

  return (
    <FixedButton
      onClick={() => {
        router.push("/login");
      }}
      value={"로그인"}
    />
  );
}
