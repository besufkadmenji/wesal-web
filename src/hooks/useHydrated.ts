"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

/**
 * False on the server and while React hydrates, true afterwards. Render
 * user-specific UI only once hydrated, so the first client render matches
 * the server HTML even when client data (e.g. `me`) is already cached by
 * the time a late-hydrating part of the page hydrates (H-50).
 */
export const useHydrated = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
