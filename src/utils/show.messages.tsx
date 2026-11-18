"use client";
import CloseIcon from "@/assets/icons/close.svg";
import SuccessIcon from "@/assets/icons/success.check.svg";
import InfoIcon from "@/assets/icons/info.message.svg";
import { toast } from "react-toastify";
import { toast as sonnerToast } from "sonner";
import { localizeNetworkError } from "@/utils/network-error";

export const showSuccessMessage = (message: string) => {
  toast.success(message, {
    icon: <SuccessIcon className="size-5" />,
    autoClose: 3000,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    className:"w-max whitespace-nowrap"
  });
};
export const showInfoMessage = (message: string) => {
  toast.info(message, {
    icon: <InfoIcon className="size-5" />,
    autoClose: 3000,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    className: "text-[#1A1A1A]! font-semibold! text-sm! rounded-[16px]! overflow-hidden!",
  });
};

export const showErrorMessage = (message: string) => {
  // Callers often pass `error.message` from a plain fetch; never show the
  // browser's English "Failed to fetch" on an Arabic page.
  sonnerToast.error(localizeNetworkError(message));
};

export const CloseButton = ({ closeToast }: { closeToast: () => void }) => {
  return (
    <button
      onClick={closeToast}
      className="absolute top-2 grid size-6! shrink-0 cursor-pointer items-center justify-items-center rounded-full border border-[#F2F2F2] bg-white ltr:right-2 rtl:left-2"
    >
      <CloseIcon className="size-3.5" />
    </button>
  );
};
