"use client";
import CloseIcon from "@/assets/icons/close.svg";
import SuccessIcon from "@/assets/icons/success.check.svg";
import InfoIcon from "@/assets/icons/info.message.svg";
import { toast } from "react-toastify";
import { toast as sonnerToast } from "sonner";

export const showSuccessMessage = (message: string) => {
  toast.success(message, {
    icon: <SuccessIcon className="size-5" />,
    autoClose: 3000,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
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
  sonnerToast.error(message);
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
