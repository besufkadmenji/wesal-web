import ImageUploadIcon from "@/assets/icons/image.upload.svg";
import RemoveIcon from "@/assets/icons/remove.svg";
import { dataUrl } from "@/config/url";
import { CreateListingMediaInput } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";
export const UploadImages = ({
  files,
  urls,
  onChangeUrls,
  onChange,
  error,
  placeholder,
  description,
  isRequired,
}: {
  files: File[];
  urls?: CreateListingMediaInput[];
  onChangeUrls?: (urls: CreateListingMediaInput[]) => void;
  onChange?: (files: File[]) => void;
  error?: string;
  placeholder: string;
  description?: string;
  isRequired?: boolean;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const validFiles = acceptedFiles.filter(
          (file) => file.size <= 10 * 1024 * 1024,
        );
        onChange?.([...files, ...validFiles]);
      }
    },
    [files, onChange],
  );
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
      maxFiles: 5,
    });
  const dict = useDict();
  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="grid grid-cols-1 gap-2">
        <div
          {...getRootProps()}
          className={twMerge(
            "border-border relative grid h-30 w-full auto-rows-max content-center justify-items-center gap-1 rounded-[20px] border border-dashed p-4",
            isDragActive && "border-primary bg-primary/5",
            isDragReject && "border-red-500 bg-red-500/5",
          )}
        >
          <input {...getInputProps()} />

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
              {isRequired && <span className="text-[#B3251E]"> *</span>}
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
        </div>
        {description && (
          <p className="text-xs leading-5 text-[#999999]">{description}</p>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
      <div className="flex flex-wrap gap-3">
        {urls && urls.length > 0 ? (
          urls.map((url, index) => (
            <SelectedImageUrl
              key={index}
              url={url.filename}
              onRemove={() => {
                const newUrls = [...urls];
                newUrls.splice(index, 1);
                onChangeUrls?.(newUrls);
              }}
            />
          ))
        ) : (
          <></>
        )}
        {files && files.length > 0 ? (
          files.map((file, index) => (
            <SelectedImage
              key={index}
              file={file}
              onRemove={() => {
                const newFiles = [...files];
                newFiles.splice(index, 1);
                onChange?.(newFiles);
              }}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export const UploadVideo = ({
  file,
  url,
  onChangeUrl,
  onChange,
  error,
  placeholder,
  description,
  isRequired,
}: {
  file?: File | null;
  url?: CreateListingMediaInput;
  onChangeUrl?: (url: CreateListingMediaInput | null) => void;
  onChange?: (file: File | null) => void;
  error?: string;
  placeholder: string;
  description?: string;
  isRequired?: boolean;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onChangeUrl?.(null);
        onChange?.(acceptedFiles[0]);
      }
    },
    [onChange, onChangeUrl],
  );
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: { "video/mp4": [] },
      maxFiles: 1,
      maxSize: 100 * 1024 * 1024, // 100 MB
    });
  const dict = useDict();
  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="grid grid-cols-1 gap-2">
        <div
          {...getRootProps()}
          className={twMerge(
            "border-border relative grid h-30 w-full auto-rows-max content-center justify-items-center gap-1 rounded-[20px] border border-dashed p-4",
            isDragActive && "border-primary bg-primary/5",
            isDragReject && "border-red-500 bg-red-500/5",
          )}
        >
          <input {...getInputProps()} />

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
              {isRequired && <span className="text-[#B3251E]"> *</span>}
            </p>
            <p
              className={twMerge(
                "text-xs leading-5 text-[#999999]",
                isDragActive && "text-primary",
                isDragReject && "text-red-500",
              )}
            >
              mp4
            </p>
          </div>
        </div>
        {description && (
          <p className="text-xs leading-5 text-[#999999]">{description}</p>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
      <div className="flex flex-wrap gap-3">
        {url ? (
          <SelectedVideoUrl
            url={url.filename}
            name={url.originalFilename}
            size={url.size}
            onRemove={() => onChangeUrl?.(null)}
          />
        ) : null}
        {file && (
          <SelectedVideo file={file} onRemove={() => onChange?.(null)} />
        )}
      </div>
    </div>
  );
};

const SelectedImage = ({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) => {
  const url = URL.createObjectURL(file);
  return (
    <div className="group relative aspect-17/10 h-32 overflow-hidden rounded-[24px]">
      <Image src={url} alt={file.name} fill className="object-cover" />
      <div className="absolute hidden h-full w-full items-center justify-items-center bg-[#00000099] group-hover:grid">
        <div
          className="relative grid size-8 cursor-pointer items-center justify-items-center rounded-full underline"
          onClick={onRemove}
        >
          <RemoveIcon className="z-10 size-8" />
          <div className="absolute m-auto size-7 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
};
const SelectedImageUrl = ({
  url,
  onRemove,
}: {
  url: string;
  onRemove: () => void;
}) => {
  return (
    <div className="group relative aspect-17/10 h-32 overflow-hidden rounded-[24px]">
      <Image
        src={`${dataUrl}/files/${url}`}
        alt={url}
        fill
        className="object-cover"
      />
      <div className="absolute hidden h-full w-full items-center justify-items-center bg-[#00000099] group-hover:grid">
        <div
          className="relative grid size-8 cursor-pointer items-center justify-items-center rounded-full underline"
          onClick={onRemove}
        >
          <RemoveIcon className="z-10 size-8" />
          <div className="absolute m-auto size-7 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
};

const SelectedVideo = ({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) => {
  const url = URL.createObjectURL(file);

  return (
    <div className="flex w-full items-center gap-2 rounded-[24px] border border-[#F2F2F2] px-4">
      <div className="pointer-events-none grid grid-cols-1 select-none">
        <video
          controls
          className="pointer-events-none size-24 rounded-[24px]"
          muted
          autoPlay
          loop
          playsInline
          disablePictureInPicture
          preload="auto"
        >
          <source src={url} type="video/mp4" />
        </video>
      </div>
      <div className="grow gap-2">
        <p className="text-[#1A1A1A]">{file.name}</p>
        <p className="text-gray">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
      </div>
      <div
        className="relative grid size-7 cursor-pointer items-center justify-items-center rounded-full underline"
        onClick={onRemove}
      >
        <RemoveIcon className="z-10 size-7" />
        <div className="absolute m-auto size-7 rounded-full bg-white" />
      </div>
    </div>
  );
};

const SelectedVideoUrl = ({
  url,
  name,
  size,
  onRemove,
}: {
  url: string;
  name: string;
  size: number;
  onRemove: () => void;
}) => {
  return (
    <div className="flex w-full items-center gap-2 rounded-[24px] border border-[#F2F2F2] px-4">
      <div className="pointer-events-none grid grid-cols-1 select-none">
        <video
          controls
          className="pointer-events-none size-24 rounded-[24px]"
          muted
          autoPlay
          loop
          playsInline
          disablePictureInPicture
          preload="auto"
        >
          <source src={`${dataUrl}/files/${url}`} type="video/mp4" />
        </video>
      </div>
      <div className="grow gap-2">
        <p className="text-[#1A1A1A]">{name}</p>
        <p className="text-gray">{(size / 1024 / 1024).toFixed(2)} MB</p>
      </div>
      <div
        className="relative grid size-7 cursor-pointer items-center justify-items-center rounded-full underline"
        onClick={onRemove}
      >
        <RemoveIcon className="z-10 size-7" />
        <div className="absolute m-auto size-7 rounded-full bg-white" />
      </div>
    </div>
  );
};
