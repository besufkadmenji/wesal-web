import { norsal } from "@/assets/fonts/norsal";
import { AppProvider } from "@/config/app.provider";
import { dir } from "i18next";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "swiper/css";
import "../globals.css";
import { CloseButton } from "@/utils/show.messages";

export const metadata: Metadata = {
  title: "Wesal",
  description: "Wesal",
};

export type Params = Promise<{ lang: string }>;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { lang } = await params;
  console.log("lang in layout:", lang);
  return (
    <html lang={lang} dir={dir(lang)} key={lang} suppressHydrationWarning>
      <body className={`${norsal.className}`}>
        <AppProvider>{children}</AppProvider>
        <ToastContainer position="top-right" closeButton={CloseButton} />
      </body>
    </html>
  );
}
