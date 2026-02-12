"use client";
import { useEffect } from "react";

export default function ScrollHandler() {
  useEffect(() => {
    // Check for hash in URL on mount
    const hash = window.location.hash;
    
    if (hash) {
      // Remove the # from hash
      const id = hash.replace("#", "");
      
      // Wait a bit for DOM to be ready
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  return null;
}
