/* eslint-disable */
// ClickUp 869fp1jmt: shows Wesal notifications that arrive through FCM
// while no Wesal tab is visible. The API sends data-only messages:
// { notificationId, title, body, link, lang }.

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
        // An open, visible tab already shows the in-app pop-up.
        if (windows.some((w) => w.visibilityState === "visible")) return;
        return self.registration.showNotification(data.title, {
          body: data.body || "",
          icon: "/images/logo.pdf.png",
          dir: data.lang === "ar" ? "rtl" : "ltr",
          lang: data.lang || "ar",
          tag: data.notificationId || undefined,
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
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windows) => {
        const open = windows.find((w) =>
          w.url.startsWith(self.location.origin),
        );
        if (open) {
          return open.focus().then((w) => (w || open).navigate(target));
        }
        return self.clients.openWindow(target);
      }),
  );
});
