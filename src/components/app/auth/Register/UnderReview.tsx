import { Modal, ModalContent } from "@heroui/react";
import { useQueryState } from "nuqs";
import UnderReviewIcon from "@/assets/icons/check.circle.border.svg";
import { useDict } from "@/hooks/useDict";
import { Button } from "@/components/ui/button";
export const UnderReview = () => {
  const [underReview, setUnderReview] = useQueryState("underReview");
  const dict = useDict();
  return (
    <Modal
      isOpen={underReview === "true"}
      onClose={() => setUnderReview("false")}
      hideCloseButton
      isDismissable={false}
      size="xl"
    >
      <ModalContent className="overflow-visible">
        <div className="relative grid grid-cols-1 overflow-visible px-6 pt-15 pb-10">
          <UnderReviewIcon className="absolute -top-12.5 right-0 left-0 mx-auto size-25" />
          <div className="grid grid-cols-1 gap-7">
            <div className="grid grid-cols-1 gap-1">
              <h1 className="text-center text-xl font-semibold text-black">
                {dict.auth.requestSubmitted}
              </h1>
              <p className="text-gray text-center text-lg">
                {dict.auth.requestUnderReviewDescription}
              </p>
            </div>
            <Button
              className="h-12.5 rounded-[16px] text-[#EFF9F0]"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              {dict.auth.continueBrowsing}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
