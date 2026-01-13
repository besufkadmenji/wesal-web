import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ImageUploadIcon from "@/assets/icons/image.upload.svg";
import { useDict } from "@/hooks/useDict";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
export const UploadImage = ({
  file,
  onChange,
  error,
  placeholder,
}: {
  file: File | null;
  onChange?: (file: File) => void;
  error?: string;
  placeholder: string;
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
  const url = file ? URL.createObjectURL(file) : null;
  return (
    <div className="grid grid-cols-1 gap-1">
      <div
        {...getRootProps()}
        className={twMerge(
          "border-border relative grid h-37 w-full auto-rows-max content-center justify-items-center gap-1 rounded-[20px] border border-dashed p-4",
          isDragActive && "border-primary bg-primary/5",
          isDragReject && "border-red-500 bg-red-500/5",
        )}
      >
        <input {...getInputProps()} />
        {url ? (
          <Image
            src={url}
            alt=""
            fill
            className="rounded-[16px] object-contain"
          />
        ) : (
          <div className="grid grid-cols-1 justify-items-center gap-1">
            <ImageUploadIcon
              className={twMerge(
                "size-4 text-[#999999]",
                isDragActive && "text-primary",
                isDragReject && "text-red-500",
              )}
            />
            <p
              className={twMerge(
                "text-xs leading-5 text-[#999999]",
                isDragActive && "text-primary",
                isDragReject && "text-red-500",
              )}
            >
              {placeholder}
            </p>
            <p
              className={twMerge(
                "text-xs leading-5 text-[#999999]",
                isDragActive && "text-primary",
                isDragReject && "text-red-500",
              )}
            >
              png, jpg, jpeg
            </p>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
