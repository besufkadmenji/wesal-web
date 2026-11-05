"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

/** How close to the bottom (px) still counts as "reading the latest". */
const NEAR_BOTTOM_PX = 120;

/**
 * Keeps a chat scrolled to its newest message: on open, when we send, and
 * when a message arrives while we're already at the bottom. If the person
 * has scrolled up to read older messages, their position is left alone.
 * Photos that finish loading later keep the view at the bottom too.
 *
 * Attach `containerRef` to the scrolling element and `contentRef` to the
 * list inside it.
 */
export const useStickToBottom = (
  lastMessageId: string | undefined,
  lastMessageIsOwn: boolean,
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const pinnedRef = useRef(true);
  const lastIdRef = useRef<string | undefined>(undefined);
  // The list only renders once there are messages.
  const hasMessages = lastMessageId !== undefined;

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;
    const onScroll = () => {
      const distance =
        container.scrollHeight - container.scrollTop - container.clientHeight;
      pinnedRef.current = distance <= NEAR_BOTTOM_PX;
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            if (pinnedRef.current) container.scrollTop = container.scrollHeight;
          });
    observer?.observe(content);
    return () => {
      container.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [hasMessages]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || !lastMessageId) return;
    const isFirst = lastIdRef.current === undefined;
    if (lastIdRef.current === lastMessageId) return;
    lastIdRef.current = lastMessageId;
    if (isFirst || lastMessageIsOwn || pinnedRef.current) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: isFirst ? "auto" : "smooth",
      });
      pinnedRef.current = true;
    }
  }, [lastMessageId, lastMessageIsOwn]);

  return { containerRef, contentRef };
};
