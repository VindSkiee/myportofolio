"use client";
import { useEffect } from "react";

export default function ScrollManager() {
  useEffect(() => {
    // 1. Cari elemen wrapper kita
    const scrollContainer = document.querySelector(".scroll-container");
    if (!scrollContainer) return;

    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      // 2. Tambahkan class ke wrapper itu sendiri
      scrollContainer.classList.add("is-scrolling");

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        scrollContainer.classList.remove("is-scrolling");
      }, 1000);
    };

    // 3. Pasang listener pada CONTAINER, bukan window
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}