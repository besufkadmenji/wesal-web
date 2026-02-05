"use client";
import { useParams } from "next/navigation";
export const useLang = () => {
  const { lang } = useParams();
  console.log("useLang", lang);
  return `${lang ?? "ar"}`;
};
