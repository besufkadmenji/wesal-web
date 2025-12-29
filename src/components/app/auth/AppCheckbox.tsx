import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export const AppCheckbox = ({
  label,
  link,
  onChange,
  id,
}: {
  label: string;
  link: {
    url: string;
    text: string;
  };
  onChange?: (checked: boolean) => void;
  id?: string;
}) => {
  return (
    <div>
      <div className="flex items-center gap-x-1">
        <div className="flex items-center gap-3">
          <Checkbox
            id={id}
            onCheckedChange={onChange}
            className="size-4.5 border-2 border-[#999999] shadow-none ring-0!"
          />
          <Label
            htmlFor={id}
            className="text-gray text-sm font-medium"
          >
            {label}
          </Label>
        </div>
        <Link
          href={link.url}
          target="_blank"
          className="text-primary text-sm font-bold underline"
        >
          {link.text}
        </Link>
      </div>
    </div>
  );
};
