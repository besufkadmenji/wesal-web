import { AppWrapper } from "@/components/app/shared/AppWrapper";

export default async function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppWrapper>{children}</AppWrapper>;
}
