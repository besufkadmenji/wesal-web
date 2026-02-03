import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MessagesIcon from "@/assets/icons/conversations.svg";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { twMerge } from "tailwind-merge";

export const ChatPopover = () => {
  const dict = useDict();
  const lang = useLang();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-10 gap-2 bg-white px-0 lg:px-2"
        >
          <div className="grid size-9.5 shrink-0 items-center justify-items-center rounded-[12px] border border-[#F2F2F2]">
            <MessagesIcon className="size-6" />
          </div>
          <p
            className={twMerge(
              "text-gray hidden text-base font-medium xl:block",
              lang === "en" && "xl:text-sm",
            )}
          >
            {dict.header.messages}
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div></div>
      </PopoverContent>
    </Popover>
  );
};
