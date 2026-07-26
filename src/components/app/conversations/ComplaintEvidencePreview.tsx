"use client";

import RemoveIcon from "@/assets/icons/remove.svg";
import Image from "next/image";
import { useEffect, useMemo } from "react";

export const ComplaintEvidencePreview = ({
  file,
  removeLabel,
  onRemove,
}: {
  file: File;
  removeLabel: string;
  onRemove: () => void;
}) => {
  const url = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => {
    return () => URL.revokeObjectURL(url);
  }, [url]);

  return (
    <div className="relative h-full min-w-0 flex-1 overflow-hidden rounded-[16px]">
      <Image
        src={url}
        alt={file.name}
        fill
        unoptimized
        className="object-contain"
      />
      <button
        type="button"
        aria-label={removeLabel}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onRemove();
        }}
        className="absolute inset-e-1.5 top-1.5 grid size-7 cursor-pointer items-center justify-center rounded-full bg-white shadow-sm"
      >
        <RemoveIcon className="size-4" />
      </button>
    </div>
  );
};
