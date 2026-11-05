/* eslint-disable */
// ClickUp 869fp1jmt: shows Wesal notifications that arrive through FCM
// while no Wesal tab is visible. The API sends data-only messages:
// { notificationId, title, body, link, lang, renotify? }. Chat messages
// use notificationId "chat-<conversationId>" so a newer one replaces it.

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) =>
  event.waitUntil(self.clients.claim()),
);

const readPayload = (event) => {
  try {
    const json = event.data ? event.data.json() : {};
    return json.data || json;
  } catch {
    return {};
  }
};

self.addEventListener("push", (event) => {
  const data = readPayload(event);
  if (!data.title) return;
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windows) => {
        // A focused tab shows the in-app pop-up instead. Only "focused"
        // counts: Chrome accepts a push that shows nothing only then, and
        // otherwise puts up its own "updated in the background" notice.
        if (windows.some((w) => w.focused)) return;
        return self.registration.showNotification(data.title, {
          body: data.body || "",
          icon: "/images/logo.pdf.png",
          dir: data.lang === "ar" ? "rtl" : "ltr",
          lang: data.lang || "ar",
          tag: data.notificationId || undefined,
          // Chat pushes reuse one tag per chat; alert again for each message.
          renotify: Boolean(data.renotify && data.notificationId),
          data: { link: data.link || "", lang: data.lang || "ar" },
        });
      }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { link = "", lang = "ar" } = event.notification.data || {};
  const target = new URL(`/${lang}${link}`, self.location.origin).href;
  event.waitUntil(
    (async () => {
      // Only a tab this worker controls can be navigated; a tab opened
      // before the worker was installed refuses, so fall back to a new tab.
      const controlled = await self.clients.matchAll({ type: "window" });
      const existing = controlled.find((w) =>
        w.url.startsWith(self.location.origin),
      );
      if (existing) {
        try {
          const focused = (await existing.focus()) || existing;
          if (await focused.navigate(target)) return;
        } catch {
          // Fall through to a new tab.
        }
      }
      await self.clients.openWindow(target);
    })(),
  );
});
