"use client";

import { PushService } from "@/services/push.service";

/**
 * ClickUp 869fp1jmt: FCM web push, so notifications reach a browser that
 * doesn't have Wesal open. Off unless the NEXT_PUBLIC_FIREBASE_* env is set.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

export const PUSH_SW_PATH = "/firebase-messaging-sw.js";
const TOKEN_KEY = "wesal.pushToken";

export type PushPermission = NotificationPermission | "unsupported";

const isConfigured = () =>
  Boolean(
    vapidKey &&
      firebaseConfig.apiKey &&
      firebaseConfig.projectId &&
      firebaseConfig.messagingSenderId &&
      firebaseConfig.appId,
  );

/** False on iPhone Safari outside a Home Screen app, and when not set up. */
export const isPushSupported = () =>
  typeof window !== "undefined" &&
  isConfigured() &&
  window.isSecureContext &&
  "serviceWorker" in navigator &&
  "PushManager" in window &&
  "Notification" in window;

export const pushPermission = (): PushPermission =>
  isPushSupported() ? Notification.permission : "unsupported";

const readStoredToken = () => {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};
const storeToken = (token: string | null) => {
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Private mode: the token is simply fetched again next time.
  }
};

const getMessagingClient = async () => {
  const [{ getApp, getApps, initializeApp }, messaging] = await Promise.all([
    import("firebase/app"),
    import("firebase/messaging"),
  ]);
  if (!(await messaging.isSupported())) return null;
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return { messaging, instance: messaging.getMessaging(app) };
};

/**
 * Asks for permission when needed (call it from a click), then registers
 * this browser with the API for the signed-in person. Returns the result.
 */
export const enablePush = async (
  language: "ar" | "en",
): Promise<PushPermission> => {
  if (!isPushSupported()) return "unsupported";
  const permission =
    Notification.permission === "default"
      ? await Notification.requestPermission()
      : Notification.permission;
  if (permission !== "granted") return permission;

  const client = await getMessagingClient();
  if (!client) return "unsupported";
  await navigator.serviceWorker.register(PUSH_SW_PATH, { scope: "/" });
  const registration = await navigator.serviceWorker.ready;
  const token = await client.messaging.getToken(client.instance, {
    vapidKey,
    serviceWorkerRegistration: registration,
  });
  if (!token) return "unsupported";
  await PushService.register(token, language);
  storeToken(token);
  return "granted";
};

/** Stops push to this browser; call it before signing out. Never throws. */
export const disablePush = async () => {
  const token = typeof window !== "undefined" ? readStoredToken() : null;
  if (!token) return;
  storeToken(null);
  try {
    await PushService.unregister(token);
  } catch {
    // Signed out already or offline: FCM drops the token once it's deleted.
  }
  try {
    const client = await getMessagingClient();
    if (client) await client.messaging.deleteToken(client.instance);
  } catch {
    // Nothing more to clean up.
  }
};
