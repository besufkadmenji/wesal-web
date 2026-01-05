"use client";
import { Nav } from "@/components/app/profile/Nav";
import { useProfileStore } from "@/components/app/profile/useProfileForm";
import { SupportPageType } from "@/components/app/support/Wrapper";
import { useMe } from "@/hooks/useMe";
import { useEffect } from "react";
import { Wrapper } from "../support/Wrapper";
import { UserProfile } from "./UserProfile";

export const Profile = () => {
  const { me } = useMe();
  const { setInitialData } = useProfileStore();

  useEffect(() => {
    if (me) {
      setInitialData({
        input: {
          id: me.id,
          name: me.name,
          email: me.email,
          phone: me.phone,
          avatarFilename: me.avatarFilename,
          bankName: me.bankName || "",
          ibanNumber: me.ibanNumber || "",
          address: me.address || "",
          latitude: me.latitude || undefined,
          longitude: me.longitude || undefined,
        },
      });
    }

    return () => {};
  }, [me, setInitialData]);

  return (
    <Wrapper variant={SupportPageType.PROFILE}>
      <div className="grid grid-cols-[3fr_8fr] gap-8 px-[7vw] items-start py-20">
        <Nav />
        <UserProfile />
        {/* {me?.role === UserRole.User ? <UserProfile /> : <ProviderProfile />} */}
      </div>
    </Wrapper>
  );
};
