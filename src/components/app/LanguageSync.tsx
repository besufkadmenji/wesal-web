"use client";

import { queryKeys } from "@/hooks/queryKeys";
import { useLang } from "@/hooks/useLang";
import { syncRealtimeLanguage } from "@/utils/apollo.client";
import { enablePush, pushPermission } from "@/utils/push";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

/**
 * Q-30: the language menu switches pages without a reload (and remounts
 * this component under the new [lang] layout), so things that picked a
 * language earlier keep it. When the live socket's language no longer
 * matches the page, reconnect it, re-read the notifications list, and
 * update this browser's push language.
 */
export const LanguageSync = () => {
  const lang = useLang() === "en" ? "en" : "ar";
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!syncRealtimeLanguage(lang)) return;
    void queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
    void queryClient.invalidateQueries({
      queryKey: queryKeys.notificationStats,
    });
    if (pushPermission() === "granted") {
      void enablePush(lang).catch(() => undefined);
    }
  }, [lang, queryClient]);

  return null;
};
