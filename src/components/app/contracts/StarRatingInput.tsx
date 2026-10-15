"use client";

import RatingIcon from "@/assets/icons/rating.svg";
import { useDict } from "@/hooks/useDict";
import { twMerge } from "tailwind-merge";

export const StarRatingInput = ({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}) => {
  const dict = useDict();
  return (
    <div
      role="radiogroup"
      aria-label={dict.contracts.ratingStarsLabel}
      className="flex items-center gap-2"
    >
      {[1, 2, 3, 4, 5].map((stars) => (
        <button
          key={stars}
          type="button"
          role="radio"
          aria-checked={value === stars}
          aria-label={`${stars} / 5`}
          disabled={disabled}
          onClick={() => onChange(stars)}
          className="rounded-md p-0.5 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#FB8A00]/50 focus-visible:outline-none disabled:pointer-events-none"
        >
          <RatingIcon
            className={twMerge(
              "size-8 text-[#d9d9d9] transition-colors",
              stars <= value && "text-[#FB8A00]",
            )}
          />
        </button>
      ))}
    </div>
  );
};
