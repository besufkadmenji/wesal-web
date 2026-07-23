"use client";

import { cn } from "@/lib/utils";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { Skeleton } from "@heroui/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export const profileImageUrl = (filename?: string | null) =>
  filename
    ? `${process.env.NEXT_PUBLIC_DATA}/files/${filename}`
    : "/images/no.avatar.png";

export const ParticipantAvatar = ({
  filename,
  name = "",
  className,
}: {
  filename?: string | null;
  name?: string | null;
  className?: string;
}) => (
  <div
    className={cn(
      "relative size-12 shrink-0 overflow-hidden rounded-full bg-[#f2f2f2]",
      className,
    )}
  >
    <Image
      src={profileImageUrl(filename)}
      alt={name || ""}
      fill
      sizes="64px"
      className="object-cover"
    />
  </div>
);

export const StatusBadge = ({
  status,
  className,
}: {
  status: string;
  className?: string;
}) => {
  const dict = useDict();
  const labels = dict.status as Record<string, string>;
  const positive = ["ACTIVE", "ACCEPTED", "IN_PROGRESS", "RESOLVED"].includes(
    status,
  );
  const negative = ["REJECTED", "CLOSED", "EXPIRED"].includes(status);
  return (
    <span
      className={cn(
        "inline-flex w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700",
        positive && "bg-emerald-50 text-emerald-700",
        negative && "bg-red-50 text-red-700",
        className,
      )}
    >
      {labels[status] || status.replaceAll("_", " ")}
    </span>
  );
};

export const EmptyState = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className="grid min-h-72 place-content-center justify-items-center gap-3 rounded-[20px] bg-white p-8 text-center">
    <div className="bg-primary/5 text-primary grid size-16 place-content-center rounded-full text-2xl">
      ···
    </div>
    <p className="text-lg font-semibold text-[#1a1a1a]">{title}</p>
    {description && <p className="text-gray max-w-md text-sm">{description}</p>}
  </div>
);

export const LoadingList = ({ rows = 4 }: { rows?: number }) => (
  <div className="grid gap-4" aria-hidden="true">
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="grid gap-3 rounded-[20px] bg-white p-5">
        <div className="flex items-center justify-between gap-6">
          <SkeletonBlock className="h-5 w-2/5 rounded-lg" />
          <SkeletonBlock className="h-5 w-20 rounded-full" />
        </div>
        <SkeletonBlock className="h-4 w-4/5 rounded-lg" />
        <SkeletonBlock className="h-4 w-1/2 rounded-lg" />
      </div>
    ))}
  </div>
);

export const SkeletonBlock = ({ className }: { className?: string }) => (
  <Skeleton
    className={cn(
      "block bg-[#e3e7ef] motion-reduce:before:animate-none",
      className,
    )}
  />
);

export const useRemainingTime = (date?: unknown) => {
  const [now, setNow] = useState(() => Date.now());
  const parsed = useMemo(() => {
    if (date == null || date === "") return null;
    if (date instanceof Date) {
      return Number.isNaN(date.getTime()) ? null : date;
    }
    if (typeof date === "string" || typeof date === "number") {
      const next = new Date(date);
      return Number.isNaN(next.getTime()) ? null : next;
    }
    return null;
  }, [date]);
  useEffect(() => {
    if (!parsed) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, [parsed]);
  return useMemo(() => {
    if (!parsed) return null;
    const milliseconds = Math.max(parsed.getTime() - now, 0);
    const totalSeconds = Math.floor(milliseconds / 1_000);
    const days = Math.floor(totalSeconds / 86_400);
    const hours = Math.floor((totalSeconds % 86_400) / 3_600);
    const minutes = Math.floor((totalSeconds % 3_600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds, expired: milliseconds === 0 };
  }, [parsed, now]);
};

export const Countdown = ({ date }: { date?: unknown }) => {
  const remaining = useRemainingTime(date);
  if (!remaining) return null;
  const totalHours = remaining.days * 24 + remaining.hours;
  return (
    <span
      dir="ltr"
      className="text-base leading-8 font-medium text-[#1a1a1a] tabular-nums"
    >
      {String(totalHours).padStart(2, "0")}:
      {String(remaining.minutes).padStart(2, "0")}:
      {String(remaining.seconds).padStart(2, "0")}
    </span>
  );
};

const toFormatDate = (value: unknown): Date | null => {
  if (value == null || value === "") return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
};

export const useLocalizedFormat = () => {
  const lang = useLang();
  const locale = lang === "ar" ? "ar-SA" : "en-SA";
  return {
    date: (value: unknown) => {
      const date = toFormatDate(value);
      return date
        ? new Intl.DateTimeFormat(locale, {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(date)
        : "—";
    },
    dateOnly: (value: unknown) => {
      const date = toFormatDate(value);
      return date
        ? new Intl.DateTimeFormat(locale, {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          }).format(date)
        : "—";
    },
    timeOnly: (value: unknown) => {
      const date = toFormatDate(value);
      return date
        ? new Intl.DateTimeFormat(locale, {
            hour: "2-digit",
            minute: "2-digit",
          }).format(date)
        : "—";
    },
    money: (value: number) =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "SAR",
        maximumFractionDigits: 2,
      }).format(value),
  };
};
