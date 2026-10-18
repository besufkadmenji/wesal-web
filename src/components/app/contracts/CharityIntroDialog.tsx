import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { Modal, ModalContent } from "@heroui/react";
import { HandHeart } from "lucide-react";
import { useState } from "react";

/** Wesal Al-Khair entry pop-up (Figma 6611:44137), shown on each visit. */
export const CharityIntroDialog = () => {
  const dict = useDict();
  const [open, setOpen] = useState(true);
  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} hideCloseButton size="lg">
      <ModalContent>
        <div className="grid justify-items-center gap-6 px-6 py-10 text-center">
          <div className="grid size-14 place-content-center rounded-[16px] bg-[#EFF1F6]">
            <HandHeart className="text-app-green size-7" />
          </div>
          <div className="grid gap-2">
            <h2 className="text-xl font-semibold text-black">
              {dict.charity.introTitle}
            </h2>
            <p className="text-gray text-base leading-7">{dict.charity.intro}</p>
          </div>
          <Button
            className="h-12.5 w-full max-w-60 rounded-[20px] text-[#EFF9F0]"
            onClick={() => setOpen(false)}
          >
            {dict.charity.ok}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
