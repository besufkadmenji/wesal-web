"use client";

import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { ImagePlus, Send, X } from "lucide-react";
import { useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { CHAT_PHOTO_TYPES } from "@/components/app/conversations/messageAttachment";

/**
 * Text box, photo button and send button of a chat (ClickUp 869fnwhm3:
 * photos per the BRD; the send arrow is mirrored, not turned, in Arabic).
 */
export const MessageComposer = ({
  content,
  setContent,
  photoPreview,
  pickPhoto,
  removePhoto,
  submitMessage,
  canSubmit,
}: {
  content: string;
  setContent: (value: string) => void;
  photoPreview: string | null;
  pickPhoto: (file: File | null | undefined) => void;
  removePhoto: () => void;
  submitMessage: () => void;
  canSubmit: boolean;
}) => {
  const dict = useDict();
  const fileInput = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-end gap-3 sm:gap-4">
      <div className="grid min-w-0 grow grid-cols-1 rounded-[16px] bg-[#f6f7fa]">
        {photoPreview && (
          <div className="relative ms-4 mt-4 size-20 overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
            <img
              src={photoPreview}
              alt=""
              className="size-full object-cover"
            />
            <button
              type="button"
              onClick={removePhoto}
              aria-label={dict.conversations.removePhoto}
              className="absolute end-1 top-1 grid size-6 cursor-pointer place-content-center rounded-full bg-black/60 text-white"
            >
              <X className="size-3.5" />
            </button>
          </div>
        )}
        <div className="flex items-end">
          <TextareaAutosize
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={dict.conversations.messagePlaceholder}
            className="min-h-14 w-full min-w-0 resize-none border-0 bg-transparent p-4 shadow-none outline-none"
            maxLength={2_000}
          />
          <input
            ref={fileInput}
            type="file"
            accept={CHAT_PHOTO_TYPES.join(",")}
            className="hidden"
            onChange={(event) => {
              pickPhoto(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-gray hover:text-primary m-1.5 size-11 shrink-0 rounded-xl"
            onClick={() => fileInput.current?.click()}
            aria-label={dict.conversations.attachPhoto}
          >
            <ImagePlus className="size-5" />
          </Button>
        </div>
      </div>
      <Button
        size="icon"
        className="my-0.75 size-12.5 shrink-0 rounded-[20px]"
        disabled={!canSubmit}
        onClick={submitMessage}
        aria-label={dict.common.send}
      >
        <Send className="size-5 rtl:-scale-x-100" />
      </Button>
    </div>
  );
};
