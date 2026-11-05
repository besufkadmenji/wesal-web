"use client";

import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { enablePush, pushPermission } from "@/utils/push";
import { useState } from "react";
import { toast } from "sonner";

/** Lets someone who skipped the prompt turn on push from the bell drawer. */
export const PushEnableButton = () => {
  const dict = useDict();
  const lang = useLang() === "en" ? "en" : "ar";
  const [permission, setPermission] = useState(pushPermission);
  const [busy, setBusy] = useState(false);

  if (permission !== "default") return null;

  const handleClick = async () => {
    setBusy(true);
    try {
      const result = await enablePush(lang);
      setPermission(result);
      if (result === "granted") toast.success(dict.push.enabled);
      if (result === "denied") toast.error(dict.push.denied);
    } catch {
      toast.error(dict.push.denied);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      className="text-primary w-full border-b border-[#F2F2F2] px-6 py-3 text-start text-sm font-medium disabled:opacity-60"
    >
      {dict.push.enableBrowser}
    </button>
  );
};
