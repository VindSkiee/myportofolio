"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScrollHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTarget = searchParams.get("scroll");

    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams]);

  return null;
}
