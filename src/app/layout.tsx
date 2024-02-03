import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { SocketProvider } from "./contexts/socket-context";
import ToastProvider from "@/providers/toast";

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
    <html
      lang="pt-BR"
      className={`${rubik.className} m-auto h-fit !max-h-screen !min-h-screen w-full`}
    >
      <body className={` flex h-full !min-h-screen  flex-col `}>
        <Header />
        <SocketProvider>
          <ToastProvider>
            <div className="flex  max-w-screen-2xl flex-1  ">{children}</div>
          </ToastProvider>
        </SocketProvider>
        <Footer />
      </body>
    </html>
  );
}
