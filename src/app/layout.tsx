import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

const rubik = Rubik({ subsets: ["latin"] });

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
    <html lang="pt-BR" className="m-auto h-fit !min-h-screen max-w-screen-2xl">
      <body
        className={`${rubik.className} flex h-full !min-h-screen  flex-col `}
      >
        <Header />
        <div className="flex  flex-1 ">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
