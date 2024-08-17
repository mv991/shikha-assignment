'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '../AuthContext'
import Navbar from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
         <AuthProvider>
      <body className={inter.className} ><Navbar/>{children}</body>
      </AuthProvider>
    </html>
  );
}
