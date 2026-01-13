import LogoutIcon from "@/assets/icons/logout.outline.svg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDict } from "@/hooks/useDict";
import { useQueryState } from "nuqs";
import { ReactNode, useState } from "react";
import { useSignSignature } from "./useSignSignature";
import { showSuccessMessage } from "@/utils/show.messages";
export const CancelContract = ({ children }: { children: ReactNode }) => {
  const { terminateContract, busy } = useSignSignature();
  const dict = useDict();
  const [open, setOpen] = useQueryState("cancelContract", {
    defaultValue: "false",
  });
  const [reason, setReason] = useState("");
  return (
    <Dialog
      open={open === "true"}
      onOpenChange={(isOpen) => {
        setOpen(isOpen ? "true" : null);
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="min-w-[42vw] p-0">
        <div className="grid grid-cols-[auto_1fr] gap-6 px-6 py-10">
          <div className="grid size-15 items-center justify-items-center rounded-[16px] bg-[#EFF1F6]">
            <LogoutIcon className="text-primary size-7.5" />
          </div>
          <div>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <h3 className="text-xl leading-8 font-semibold text-black">
                  {dict.contract.cancelReason.title}
                </h3>
                <p className="text-gray leading-7">
                  {dict.contract.cancelReason.subtitle}
                </p>
              </div>
              <textarea
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                }}
                className="focus:border-primary placeholder:text-gray h-30 resize-none rounded-[20px] border border-[#F2F2F2] p-4 text-black outline-none placeholder:text-sm"
                placeholder={dict.contract.cancelReason.placeholder}
              ></textarea>
              <div className="mt-3 grid grid-cols-2 gap-6">
                <Button
                  className="h-12.5 rounded-full font-semibold text-white outline-none!"
                  onClick={() => {
                    terminateContract(reason).then((v) => {
                      if (v) {
                        setReason("");
                        setOpen(null);
                      }
                    });
                  }}
                  disabled={busy}
                >
                  {dict.contract.cancelReason.send}
                </Button>
                <Button
                  className="h-12.5 rounded-full bg-[#F2F2F2] font-semibold text-[#4D4D4D] outline-none!"
                  onClick={() => {
                    setOpen(null);
                  }}
                  variant={"secondary"}
                  disabled={busy}
                >
                  {dict.contract.cancelReason.cancel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
