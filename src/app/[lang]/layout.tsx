import { norsal } from "@/assets/fonts/norsal";
import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "@/config/app.provider";
import { CloseButton } from "@/utils/show.messages";
import { dir } from "i18next";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "swiper/css";
import "../globals.css";

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
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
