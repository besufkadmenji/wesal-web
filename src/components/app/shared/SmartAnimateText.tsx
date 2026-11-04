import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

/**
 * Cycles through `items` in place, fading one out before the next fades in.
 * Inline, so the phrase reads as the continuation of the sentence around it
 * and wraps like normal text on small screens.
 */
export const SmartAnimateText = ({
  delay = 1500,
  duration = 0.45,
  items,
  dir,
  className,
  classNames,
}: {
  delay?: number;
  duration?: number;
  items: string[];
  dir?: "ltr" | "rtl";
  className?: string;
  classNames?: {
    container?: string;
  };
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, delay);

    return () => clearInterval(timer);
  }, [delay, items.length]);

  return (
    <span className={twMerge("inline", classNames?.container)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={items[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration / 2, ease: [0.4, 0, 0.2, 1] }}
          dir={dir}
          className={twMerge("inline", className)}
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
