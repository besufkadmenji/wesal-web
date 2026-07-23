import { cn } from "@/lib/utils";
import Image from "next/image";

const VARIANT_STYLES = {
  dialog: {
    wrapper: "grid gap-3",
    label: "text-start text-base leading-[1.7] text-[#1a1a1a]",
    frame: "h-[120px] rounded-2xl border-[#e5e7eb]",
    image: "object-contain p-3",
    sizes: "370px",
    empty: "",
  },
  detail: {
    wrapper: "grid gap-2",
    label: "text-sm font-medium",
    frame: "h-32 rounded-[14px] border-[#d6d9e0]",
    image: "object-contain p-2",
    sizes: undefined,
    empty: "text-sm",
  },
} as const;

export const SignaturePreview = ({
  label,
  filename,
  variant = "dialog",
}: {
  label: string;
  filename?: string | null;
  variant?: keyof typeof VARIANT_STYLES;
}) => {
  const styles = VARIANT_STYLES[variant];
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>{label}</p>
      <div
        className={cn(
          "relative overflow-hidden border border-dashed bg-white",
          styles.frame,
        )}
      >
        {filename ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_DATA}/files/${filename}`}
            alt={label}
            fill
            sizes={styles.sizes}
            className={styles.image}
          />
        ) : (
          <span
            className={cn(
              "text-gray absolute inset-0 grid place-content-center",
              styles.empty,
            )}
          >
            —
          </span>
        )}
      </div>
    </div>
  );
};
