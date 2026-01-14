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
        <Button variant="ghost" className="flex h-10 gap-2 bg-white px-0 lg:px-2">
          <div className="grid size-9.5 shrink-0 items-center justify-items-center rounded-[12px] border border-[#F2F2F2]">
            <NotificationIcon className="size-6" />
          </div>
          <p className="text-gray hidden text-base font-medium xl:block">
            {dict.header.notifications}
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div></div>
      </PopoverContent>
    </Popover>
  );
};
