import { Modal, ModalContent } from "@heroui/react";
import { useQueryState } from "nuqs";
import UnderReviewIcon from "@/assets/icons/check.circle.border.svg";
import { useDict } from "@/hooks/useDict";
import { Button } from "@/components/ui/button";
import BeProviderIcon from "@/assets/icons/be.provider.svg";
import { useAppRouter } from "@/hooks/use.app.router";
export const BeProvider = () => {
  const [beProvider, setBeProvider] = useQueryState("be-provider");
  const dict = useDict();
  const router = useAppRouter();
  return (
    <Modal
      isOpen={beProvider === "true"}
      onClose={() => setBeProvider(null)}
      hideCloseButton
      isDismissable={false}
      size="2xl"
    >
      <ModalContent className="overflow-visible">
        <div className="grid grid-cols-[auto_1fr] gap-6 overflow-visible px-6 py-10">
          <div className="grid size-14 items-center justify-items-center rounded-[16px] bg-[#EFF1F6]">
            <BeProviderIcon className="size-7" />
          </div>
          <div className="grid grid-cols-1 gap-7">
            <div className="grid grid-cols-1 gap-2 ltr:pr-16 rtl:pl-16">
              <h1 className="ext-xl font-semibold text-black">
                {dict.auth.choose.providerTitle}
              </h1>
              <p className="text-gray text-base font-normal">
                {dict.auth.choose.providerDescription}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="h-12.5 rounded-[20px] text-[#EFF9F0]"
                onClick={() => {
                  router.push("/auth/login?type=provider");
                }}
              >
                {dict.auth.choose.providerSignUp}
              </Button>
              <Button
                className="h-12.5 rounded-[20px] bg-[#F2F2F2] text-[#4D4D4D]"
                variant={"ghost"}
                onClick={() => {
                  setBeProvider(null);
                }}
              >
                {dict.auth.choose.cancel}
              </Button>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
