import { twMerge } from "tailwind-merge";
export const FormRadio = ({
  label,
  isRequired,
  value,
  onChange,
  options,
}: {
  label: string;
  isRequired: boolean;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string; isDisabled?: boolean }[];
}) => {
  console.log("Rendering FormRadio with value:", value, options);
  return (
    <div className="grid grid-cols-1 gap-3">
      <label className={twMerge("text-gray bg-white text-sm")}>
        {label}
        {isRequired && <span className="text-[#B3251E]"> *</span>}
      </label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <RadioItem
            key={option.value}
            label={option.label}
            isSelected={value === option.value}
            onSelect={() => onChange(option.value)}
            isDisabled={option.isDisabled}
          />
        ))}
      </div>
    </div>
  );
};

const RadioItem = ({
  label,
  isSelected,
  onSelect,
  isDisabled,
}: {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  isDisabled?: boolean;
}) => {
  return (
    <div
      className={twMerge(
        "flex cursor-pointer items-center justify-between rounded-[20px] border border-[#F2F2F2] p-4",
        isSelected && "border-primary bg-[#EFF1F6]",
        isDisabled && "cursor-not-allowed opacity-50",
      )}
      onClick={isDisabled ? undefined : onSelect}
    >
      <p>{label}</p>
      <div
        className={twMerge(
          "grid size-5 items-center justify-items-center rounded-full border-2 border-[#999999] transition-all duration-200 ease-in",
          isSelected && "border-primary",
        )}
      >
        <div
          className={twMerge(
            "bg-primary size-3 scale-0 rounded-full transition-all duration-200 ease-in",
            isSelected && "scale-100",
          )}
        />
      </div>
    </div>
  );
};
