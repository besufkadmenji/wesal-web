"use server";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function changeLang(
  lng: string,
  pathname: string,
  noRedirect?: boolean,
) {
  const cookieStore = await cookies();

  cookieStore.set("lang", lng, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  if (!noRedirect) {
    redirect(`/${lng}${pathname}`, RedirectType.replace);
  }
  return `/${lng}${pathname}`;
}
