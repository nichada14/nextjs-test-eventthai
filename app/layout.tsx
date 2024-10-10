"use client";

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation"; 
import { metadata } from "./metadata"; 

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>{String(metadata.title) || "Default Title"}</title> 
        <meta name="description" content={String(metadata.description) || "Default description"} /> 
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {pathname !== "/" && pathname !== "/login" && pathname !== "/register" && <Navbar />} 
        {children}
      </body>
    </html>
  );
}
