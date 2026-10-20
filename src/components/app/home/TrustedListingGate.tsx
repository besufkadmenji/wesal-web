import { Button } from "@/components/ui/button";
import { useAppRouter } from "@/hooks/use.app.router";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import { Modal, ModalContent } from "@heroui/react";
import { LogIn, UserRound } from "lucide-react";

export type TrustedGateMode = "login" | "be-customer";

/**
 * BRD 4.1.2 / 4.2.2 carousel click rules: a visitor is asked to log in, a
 * provider to register as a service requester first.
 */
export const TrustedListingGate = ({
  mode,
  onClose,
}: {
  mode: TrustedGateMode | null;
  onClose: () => void;
}) => {
  const dict = useDict();
  const { logout } = useMe();
  const lang = useLang();
  const router = useAppRouter();
  const copy =
    mode === "be-customer"
      ? dict.home.topListing.customerDialog
      : dict.home.topListing.loginDialog;
  const Icon = mode === "be-customer" ? UserRound : LogIn;

  const confirm = () => {
    if (mode === "be-customer") {
      // Full reload after logout so no provider session state lingers.
      logout(true);
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- deliberate hard navigation after logout
      window.location.assign(
        `${window.location.origin}/${lang}/auth/register?type=user`,
      );
      return;
    }
    router.push(`/${lang}/auth/login?type=user`);
  };

  return (
    <Modal
      isOpen={mode !== null}
      onClose={onClose}
      hideCloseButton
      size="2xl"
    >
      <ModalContent className="overflow-visible">
        <div className="grid grid-cols-[auto_1fr] gap-6 overflow-visible px-6 py-10">
          <div className="grid size-14 items-center justify-items-center rounded-[16px] bg-[#EFF1F6]">
            <Icon className="text-app-green size-7" />
          </div>
          <div className="grid grid-cols-1 gap-7">
            <div className="grid grid-cols-1 gap-2 ltr:pr-16 rtl:pl-16">
              <h1 className="text-xl font-semibold text-black">{copy.title}</h1>
              <p className="text-gray text-base font-normal">
                {copy.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="h-12.5 rounded-[20px] text-[#EFF9F0]"
                onClick={confirm}
              >
                {copy.confirm}
              </Button>
              <Button
                className="h-12.5 rounded-[20px] bg-[#F2F2F2] text-[#4D4D4D]"
                variant={"ghost"}
                onClick={onClose}
              >
                {copy.cancel}
              </Button>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
