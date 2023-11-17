import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavState from "@/components/(Navs)/NavState";
const inter = Inter({ subsets: ["latin"] });
// import Head from "next/head";
export const metadata: Metadata = {
  title: "Espece",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NavState />
        {children}
      </body>
    </html>
  );
}
