"use client";

import { useEffect } from "react";

import { USER_UPDATED_SUBSCRIPTION } from "@/graphql/user/userUpdated";
import { UserStatus } from "@/gql/graphql";
import client from "@/utils/apollo.client";

export const useUserStatusWatch = (
  isLoggedIn: boolean,
  logout: (noReload?: boolean) => Promise<void>,
) => {
  useEffect(() => {
    if (!isLoggedIn) return;
    console.log("Subscribing to user status updates...");
    const apolloClient = client();
    const observable = apolloClient.subscribe({
      query: USER_UPDATED_SUBSCRIPTION,
    });

    const subscription = observable.subscribe({
      next: ({ data }) => {
        const payload = data as {
          userUpdated?: { id: string; status: string };
        } | null;
        const status = payload?.userUpdated?.status;
        if (status && status !== UserStatus.Active) {
          logout();
        }
      },
      error: (err) => {
        console.warn("userUpdated subscription error:", err);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isLoggedIn, logout]);
};
