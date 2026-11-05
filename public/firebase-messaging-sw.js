/* eslint-disable */
// ClickUp 869fp1jmt: shows Wesal notifications that arrive through FCM
// while no Wesal tab is visible. The API sends data-only messages:
// { notificationId, title, body, link, lang }. Each push gets its own
// notification, and the worker never closes or replaces one: on macOS that
// left notifications Chrome considered closed (clicks did nothing) and made
// Chrome add its "updated in the background" notice.

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
  event.waitUntil(
    (async () => {
      const windows = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      // A focused tab shows the in-app pop-up instead. Only "focused"
      // counts: Chrome accepts a push that shows nothing only then, and
      // otherwise puts up its own "updated in the background" notice.
      if (windows.some((w) => w.focused)) return;
      const tag = data.notificationId || undefined;
      // Never show nothing here, even for an unexpected payload.
      await self.registration.showNotification(data.title || "Wesal", {
        body: data.body || "",
        icon: "/images/logo.pdf.png",
        dir: data.lang === "ar" ? "rtl" : "ltr",
        lang: data.lang || "ar",
        tag,
        data: { link: data.link || "", lang: data.lang || "ar" },
      });
    })(),
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
