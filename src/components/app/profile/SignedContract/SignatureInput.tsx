import { useDict } from "@/hooks/useDict";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

export const SignatureInput = ({
  label,
  isRequired,
  initUrl,
  file,
  onChange,
  error,
}: {
  label: string;
  isRequired?: boolean;
  initUrl?: string | null;
  file: File | null;
  onChange?: (file: File) => void;
  error?: string;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onChange?.(acceptedFiles[0]);
      }
    },
    [onChange],
  );
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
      maxFiles: 1,
    });
  const dict = useDict();
  const url = file
    ? URL.createObjectURL(file)
    : initUrl
      ? `${process.env.NEXT_PUBLIC_DATA}/files/${initUrl}`
      : null;
  return (
    <div className="grid grid-cols-1 gap-3">
      <label className="text-base leading-8 font-medium text-black">
        {label} {isRequired && <span className="text-[#B3251E]">*</span>}
      </label>
      <div
        {...getRootProps()}
        className={twMerge(
          "border-border relative grid h-37 w-full auto-rows-max content-center justify-items-center gap-1 rounded-[20px] border border-dashed bg-white p-4",
          isDragActive && "border-primary bg-primary/5",
          isDragReject && "border-red-500 bg-red-500/5",
        )}
      >
        <input {...getInputProps()} disabled={!!initUrl} />
        {url ? (
          <Image src={url} alt="" fill className="object-contain" />
        ) : (
          <div className="grid grid-cols-1 justify-items-center gap-1"></div>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
