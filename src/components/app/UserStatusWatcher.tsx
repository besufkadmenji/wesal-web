"use client";

import { useMe } from "@/hooks/useMe";
import { useUserStatusWatch } from "@/hooks/useUserStatusWatch";

export const UserStatusWatcher = () => {
  const { isLoggedIn, logout } = useMe();
  useUserStatusWatch(isLoggedIn, logout);
  return null;
};
