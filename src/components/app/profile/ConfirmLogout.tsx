import LogoutIcon from "@/assets/icons/logout.outline.svg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { useQueryState } from "nuqs";
import { ReactNode } from "react";
export const ConfirmLogout = ({ children }: { children: ReactNode }) => {
  const { logout } = useMe();
  const dict = useDict();
  const [open, setOpen] = useQueryState("confirmLogout", {
    defaultValue: "false",
  });
  return (
    <Dialog
      open={open === "true"}
      onOpenChange={(isOpen) => {
        setOpen(isOpen ? "true" : null);
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="min-w-[42vw]">
        <div className="grid grid-cols-1 gap-8">
          <div className="grid grid-cols-[auto_1fr] gap-6">
            <div className="grid size-15 items-center justify-items-center rounded-[16px] bg-[#FBEAE9]">
              <LogoutIcon className="size-7.5 text-[#B3251E]" />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <h3 className="text-xl leading-8 font-semibold text-black">
                {dict.profile.logoutConfirmation.title}
              </h3>
              <p className="text-gray leading-7">
                {dict.profile.logoutConfirmation.description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Button
              className="h-12.5 rounded-full bg-[#B3251E] font-semibold text-white outline-none! hover:bg-[#ac170f]"
              onClick={() => {
                logout();
              }}
            >
              {dict.profile.logoutConfirmation.confirm}
            </Button>
            <Button
              className="h-12.5 rounded-full bg-[#F2F2F2] font-semibold text-[#4D4D4D] outline-none!"
              onClick={() => {
                setOpen(null);
              }}
              variant={"secondary"}
            >
              {dict.profile.logoutConfirmation.cancel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
