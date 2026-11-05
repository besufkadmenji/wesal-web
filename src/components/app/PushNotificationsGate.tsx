"use client";

import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import { enablePush, pushPermission } from "@/utils/push";
import { useEffect } from "react";
import { toast } from "sonner";

const SNOOZE_KEY = "wesal.pushPromptSnoozedUntil";
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;
const PROMPT_DELAY_MS = 3000;

const isSnoozed = () => {
  try {
    return Number(window.localStorage.getItem(SNOOZE_KEY) ?? 0) > Date.now();
  } catch {
    return false;
  }
};
const snooze = () => {
  try {
    window.localStorage.setItem(SNOOZE_KEY, String(Date.now() + SNOOZE_MS));
  } catch {
    // Private mode: the prompt may show again next visit.
  }
};

/**
 * ClickUp 869fp1jmt: keeps this browser registered for FCM push while
 * someone is signed in, and offers to turn it on once (browsers only show
 * the permission prompt after a click).
 */
export const PushNotificationsGate = () => {
  const { me, isLoggedIn } = useMe();
  const dict = useDict();
  const lang = useLang() === "en" ? "en" : "ar";
  const principalId = me?.provider?.id || me?.user?.id;

  useEffect(() => {
    if (!isLoggedIn || !principalId) return;
    const permission = pushPermission();
    if (permission === "granted") {
      // Refresh the token and tie it to whoever is signed in now.
      void enablePush(lang).catch(() => undefined);
      return;
    }
    if (permission !== "default" || isSnoozed()) return;
    const timer = window.setTimeout(() => {
      toast(dict.push.prompt, {
        id: "push-prompt",
        duration: Infinity,
        action: {
          label: dict.push.enable,
          onClick: () => {
            void enablePush(lang)
              .then((result) => {
                if (result === "granted") toast.success(dict.push.enabled);
                else if (result === "denied") toast.error(dict.push.denied);
                else snooze();
              })
              .catch(() => snooze());
          },
        },
        cancel: { label: dict.push.notNow, onClick: snooze },
        onDismiss: snooze,
      });
    }, PROMPT_DELAY_MS);
    return () => window.clearTimeout(timer);
    // The prompt is offered once per sign-in, not on every language switch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, principalId]);

  return null;
};
