"use client";

import { useEffect } from "react";

import { USER_UPDATED_SUBSCRIPTION } from "@/graphql/user/userUpdated";
import { PROVIDER_UPDATED_SUBSCRIPTION } from "@/graphql/providers/providerUpdated";
import client from "@/utils/apollo.client";

const ACTIVE_STATUS = "ACTIVE";

export const useUserStatusWatch = (
  isLoggedIn: boolean,
  logout: (noReload?: boolean) => Promise<void>,
) => {
  useEffect(() => {
    if (!isLoggedIn) return;

    const apolloClient = client();

    const handleStatusUpdate = (status: string | undefined) => {
      if (status && status !== ACTIVE_STATUS) {
        logout();
      }
    };

    const userSub = apolloClient
      .subscribe({ query: USER_UPDATED_SUBSCRIPTION })
      .subscribe({
        next: ({ data }) => {
          const payload = data as {
            userUpdated?: { id: string; status: string };
          } | null;
          handleStatusUpdate(payload?.userUpdated?.status);
        },
        error: (err) => console.warn("userUpdated subscription error:", err),
      });

    const providerSub = apolloClient
      .subscribe({ query: PROVIDER_UPDATED_SUBSCRIPTION })
      .subscribe({
        next: ({ data }) => {
          const payload = data as {
            providerUpdated?: { id: string; status: string };
          } | null;
          handleStatusUpdate(payload?.providerUpdated?.status);
        },
        error: (err) =>
          console.warn("providerUpdated subscription error:", err),
      });

    return () => {
      userSub.unsubscribe();
      providerSub.unsubscribe();
    };
  }, [isLoggedIn, logout]);
};
