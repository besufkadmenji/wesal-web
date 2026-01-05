import { AppWrapper } from "@/components/app/shared/AppWrapper";
import { ProfileWrapper } from "@/components/app/profile/ProfileWrapper";

export default async function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppWrapper>
      <ProfileWrapper>{children}</ProfileWrapper>
    </AppWrapper>
  );
}
