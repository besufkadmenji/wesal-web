import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationIcon from "@/assets/icons/notifications.svg";
import { useDict } from "@/hooks/useDict";

export const NotificationPopover = () => {
  const dict = useDict();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex gap-2 bg-white px-2 h-10">
          <div className="grid size-9.5 shrink-0 items-center justify-items-center rounded-[12px] border border-[#F2F2F2]">
            <NotificationIcon className="size-6" />
          </div>
          <p className="text-gray text-base font-medium">
            {dict.header.notifications}
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div></div>{" "}
      </PopoverContent>
    </Popover>
  );
};
