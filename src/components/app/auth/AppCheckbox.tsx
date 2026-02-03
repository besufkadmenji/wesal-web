import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

export const AppCheckbox = ({
  label,
  link,
  onChange,
  id,
  error,
  checked,
}: {
  label: string;
  link: {
    url: string;
    text: string;
    target?: HTMLAttributeAnchorTarget | undefined;
  };
  onChange?: (checked: boolean) => void;
  id?: string;
  error?: string;
  checked?: boolean;
}) => {
  return (
    <div className="grid grid-cols-1">
      <div>
        <div className="flex items-center gap-x-1">
          <div className="flex items-center gap-3">
            <Checkbox
              id={id}
              checked={checked}
              onCheckedChange={onChange}
              className="size-4.5 border-2 border-[#999999] shadow-none ring-0!"
            />
            <Label htmlFor={id} className="text-gray text-sm font-medium">
              {label}
            </Label>
          </div>
          <Link
            href={link.url}
            target={link.target}
            className="text-primary text-sm font-bold underline"
          >
            {link.text}
          </Link>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
