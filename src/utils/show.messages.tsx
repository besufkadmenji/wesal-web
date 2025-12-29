"use client";
import SuccessIcon from "@/assets/icons/success.check.svg";
import CloseIcon from "@/assets/icons/close.svg";
import { toast } from "react-toastify";
export const showSuccessMessage = (message: string) => {
  toast.success(message, {
    icon: <SuccessIcon className="size-5" />,
    autoClose: 3000,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
  });
};

export const CloseButton = ({ closeToast }: { closeToast: () => void }) => {
  return (
    <button
      onClick={closeToast}
      className="absolute top-2 right-2 grid size-6! shrink-0 cursor-pointer items-center justify-items-center rounded-full border border-[#F2F2F2] bg-white"
    >
      <CloseIcon className="size-3.5" />
    </button>
  );
};
