import type { Metadata } from "next";
import { JetBrains_Mono, Baloo_2, Plus_Jakarta_Sans, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ScrollManager from "@/components/scroll/ScrollManager";

// Font configurations
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-baloo-2",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Full-Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${jetbrainsMono.variable} ${baloo2.variable} ${plusJakartaSans.variable} ${outfit.variable}`}
    >
      <head>
        {/* reCAPTCHA v3 - Production Key */}
        {/* Test Key (Dev): 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI */}
        <Script
          src="https://www.google.com/recaptcha/api.js?render=6Lflt1gsAAAAAL-eFb-bGwQhNibsLn3c5q7AJguh"
          strategy="lazyOnload"
        />
      </head>
      <body className="antialiased">
        <div className="scroll-container">
          
          <ScrollManager /> {/* Komponen logic ditaruh di dalam */}
          
          {children} {/* Halaman website render disini */}
          
        </div>
      </body>
    </html>
  );
}
