import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talk",
  description: "Talk project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="h-fit !min-h-screen max-w-screen-2xl m-auto">
      <body
        className={`${inter.className} flex h-full !min-h-screen  flex-col flex-1`}
      >
        {children}
      </body>
    </html>
  );
}
