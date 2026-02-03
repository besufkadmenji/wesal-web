"use client";
import { ProviderProfile } from "@/components/app/profile/ProviderProfile";
import { useProfileStore } from "@/components/app/profile/useProfileForm";
import { useMe } from "@/hooks/useMe";
import { useEffect } from "react";
import { useProviderProfileStore } from "./useProviderProfileForm";
import { UserProfile } from "./UserProfile";

export const Profile = () => {
  const { me } = useMe();
  const { setInitialData } = useProfileStore();
  const { setInitialData: setProviderInitialData } = useProviderProfileStore();

  useEffect(() => {
    if (me?.user) {
      setInitialData({
        input: {
          id: me.user.id,
          name: me.user.name,
          email: me.user.email,
          phone: me.user.phone,
          dialCode: me.user.dialCode,
          avatarFilename: me.user.avatarFilename,
          bankName: me.user.bankName || "",
          ibanNumber: me.user.ibanNumber || "",
          address: me.user.address || "",
          latitude: me.user.latitude || undefined,
          longitude: me.user.longitude || undefined,
        },
      });
    }
    if (me?.provider) {
      setProviderInitialData({
        input: {
          id: me.provider.id,
          name: me.provider.name,
          email: me.provider.email,
          phone: me.provider.phone,
          dialCode: me.provider.dialCode,
          avatarFilename: me.provider.avatarFilename,
          bankName: me.provider.bankName || "",
          ibanNumber: me.provider.ibanNumber || "",
          address: me.provider.address || "",
          latitude: me.provider.latitude || undefined,
          longitude: me.provider.longitude || undefined,
        },
      });
    }

    return () => {};
  }, [me, setInitialData, setProviderInitialData]);

  return me?.user ? <UserProfile /> : <ProviderProfile />;
};
