import type { Metadata } from "next";
import { JetBrains_Mono, Baloo_2, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
  weight: "200",
  variable: "--font-plus-jakarta-sans",
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
      className={`${jetbrainsMono.variable} ${baloo2.variable} ${plusJakartaSans.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
