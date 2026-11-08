import CloseIcon from "@/assets/icons/notifications/close.svg";
import { useAppRouter } from "@/hooks/use.app.router";
import { useDict } from "@/hooks/useDict";
import { Modal, ModalContent } from "@heroui/react";
import { useQueryState } from "nuqs";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/hooks/useLang";
import { useSetting } from "@/hooks/useSettings";
export const TermsModal = () => {
  const [showTerms, setShowTerms] = useQueryState("show-terms");
  const dict = useDict();
  const router = useAppRouter();
  const lng = useLang();
  const { setting } = useSetting();
  return (
    <Modal
      isOpen={showTerms === "true"}
      onClose={() => setShowTerms(null)}
      hideCloseButton
      isDismissable={true}
      size="2xl"
    >
      <ModalContent className="relative overflow-hidden rounded-[20px]">
        <button
          type="button"
          onClick={() => setShowTerms(null)}
          aria-label={dict.common.close}
          className="absolute end-4 top-4 z-10 grid size-8 place-content-center rounded-2xl border border-[#F2F2F2] bg-white"
        >
          <CloseIcon className="size-4" />
        </button>
        <div className="grid max-h-[84vh] grid-cols-1 justify-items-center gap-6 overflow-y-auto bg-white px-6 py-10">
          <Link href="/" className="relative aspect-12/10 w-18">
            <Image
              src={"/images/main.logo.svg"}
              alt="logo"
              fill
              className="object-contain"
            />
          </Link>
          {setting && (
            <div
              className="prose whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: lng === "en" ? setting.termsEn : setting.termsAr,
              }}
            />
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};
