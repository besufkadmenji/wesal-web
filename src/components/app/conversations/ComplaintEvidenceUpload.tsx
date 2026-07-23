"use client";

import ImageUploadIcon from "@/assets/icons/image.upload.svg";
import { ComplaintEvidencePreview } from "@/components/app/conversations/ComplaintEvidencePreview";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export const ComplaintEvidenceUpload = ({
  files,
  evidenceLabel,
  evidenceFormats,
  evidenceMaxSize,
  removeLabel,
  onChange,
}: {
  files: File[];
  evidenceLabel: string;
  evidenceFormats: string;
  evidenceMaxSize: string;
  removeLabel: string;
  onChange: (files: File[]) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canAddMore = files.length < 3;

  useEffect(() => {
    if (!files.length && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [files]);

  const removeFile = (index: number) => {
    const nextFiles = files.filter((_, fileIndex) => fileIndex !== index);
    onChange(nextFiles);
    if (!nextFiles.length && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="grid gap-2">
      <label className={cn("relative block", canAddMore && "cursor-pointer")}>
        <input
          ref={fileInputRef}
          type="file"
          className="sr-only"
          accept="image/png,image/jpeg"
          multiple
          disabled={!canAddMore}
          onChange={(event) => {
            onChange([...files, ...Array.from(event.target.files || [])]);
            event.target.value = "";
          }}
        />
        <div
          className={cn(
            "border-border flex h-[120px] rounded-[20px] border border-dashed px-4 py-3",
            files.length > 0 ? "gap-2 p-2" : "flex-col items-center justify-center gap-1",
          )}
        >
          {files.length > 0 ? (
            files.map((file, index) => (
              <ComplaintEvidencePreview
                key={`${file.name}-${file.lastModified}`}
                file={file}
                removeLabel={removeLabel}
                onRemove={() => removeFile(index)}
              />
            ))
          ) : (
            <>
              <ImageUploadIcon className="size-4 text-[#999]" />
              <p className="text-xs leading-[1.7] text-[#999]">{evidenceLabel}</p>
              <p className="text-xs leading-[1.7] text-[#999]">
                {evidenceFormats}
              </p>
            </>
          )}
        </div>
      </label>
      <p className="text-xs leading-[1.7] text-[#999]">{evidenceMaxSize}</p>
    </div>
  );
};
