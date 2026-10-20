import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { Modal, ModalContent } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";

/** Wesal Al-Khair entry pop-up (Figma "pop up 40", 6611:44137), shown on each visit. */
export const CharityIntroDialog = () => {
  const dict = useDict();
  const [open, setOpen] = useState(true);
  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      hideCloseButton
      classNames={{ base: "max-w-[657px] rounded-[20px]" }}
    >
      <ModalContent>
        <div className="grid grid-cols-[auto_1fr] items-start gap-6 px-6 py-10">
          <Image
            src="/images/ihsan.png"
            alt={dict.charity.ihsanLogoAlt}
            width={60}
            height={60}
            className="size-15 object-cover"
          />
          <div className="grid gap-7">
            <p className="text-xl leading-[1.6] font-semibold text-[#1a1a1a]">
              {dict.charity.intro}
            </p>
            <Button
              className="h-12.5 w-full rounded-[20px] px-6 text-base font-semibold"
              onClick={() => setOpen(false)}
            >
              {dict.charity.ok}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
