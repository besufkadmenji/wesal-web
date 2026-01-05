"use client";
import { useProfileStore } from "@/components/app/profile/useProfileForm";
import { useMe } from "@/hooks/useMe";
import { useEffect } from "react";
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

  return <UserProfile />;
};
