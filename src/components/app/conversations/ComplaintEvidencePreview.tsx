"use client";

import RemoveIcon from "@/assets/icons/remove.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ComplaintEvidencePreview = ({
  file,
  removeLabel,
  onRemove,
}: {
  file: File;
  removeLabel: string;
  onRemove: () => void;
}) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!url) return null;

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
