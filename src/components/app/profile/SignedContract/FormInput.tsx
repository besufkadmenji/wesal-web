import { twMerge } from "tailwind-merge";

export const FormInput = ({
  label,
  value,
  className,
}: {
  label: string;
  value?: string;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "grid min-h-23 grid-cols-1 content-start gap-2 break-words rounded-[16px]! border border-[#F2F2F2] bg-[#FBFBFB] p-4",
        className,
      )}
    >
      <p className="text-gray leading-7">{label}</p>
      <p className="text-black leading-7">{value}</p>
    </div>
  );
};
