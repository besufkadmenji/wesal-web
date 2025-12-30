import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

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
  height?: number;
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
    <span
      style={{
        position: "relative",
        display: "inline-block",
        minWidth: "20px",
        verticalAlign: "baseline",
      }}
      className={classNames?.container}
    >
      <AnimatePresence mode="sync">
        <motion.span
          key={items[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease: [0.4, 0, 0.2, 1] }}
          dir={dir}
          className={twMerge(
            "absolute inset-0 bottom-0 whitespace-nowrap",
            dir === "rtl" ? "text-right" : "text-left",
            className,
          )}
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
