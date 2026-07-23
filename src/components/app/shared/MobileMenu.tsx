import AddIcon from "@/assets/icons/add.circle.svg";
import MenuIcon from "@/assets/icons/menu.svg";
import { NavItem } from "@/components/app/shared/NavItem";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import {
  Button as HeroButton,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

export const MobileMenu = () => {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const dict = useDict();
  const { me } = useMe();
  const router = useRouter();
  const [, setBeProvider] = useQueryState("be-provider");
  const isLoggedIn = Boolean(me?.user || me?.provider);

  return (
    <>
      <HeroButton
        onPress={onOpen}
        className="bg-white xl:hidden"
        aria-label={dict.common.menu}
        isIconOnly
      >
        <MenuIcon className="size-8" />
      </HeroButton>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <div className="grid h-full grid-rows-[1fr_auto] p-8">
            <div className="grid auto-rows-max grid-cols-1 content-center items-center justify-items-center overflow-y-auto">
              <nav className="grid h-full grow grid-cols-1 justify-center gap-10">
                <NavItem
                  label={dict.home.nav.home}
                  href={"/"}
                  onNavigate={onClose}
                />
                <NavItem
                  label={dict.home.nav.categories}
                  href={"/categories"}
                  onNavigate={onClose}
                />
                {me?.provider && (
                  <NavItem
                    label={dict.home.nav.myListings}
                    href={"/my-listings"}
                    onNavigate={onClose}
                  />
                )}
                {isLoggedIn && (
                  <NavItem
                    label={dict.home.nav.contracts}
                    href={"/contracts"}
                    onNavigate={onClose}
                  />
                )}
                <NavItem
                  label={dict.home.nav.goodConnections}
                  href={"/good-connections"}
                  onNavigate={onClose}
                />
                <NavItem
                  label={dict.home.nav.contactUs}
                  href={"/support/contact-us"}
                  onNavigate={onClose}
                />
              </nav>
            </div>
            <Button
              variant={"secondary"}
              className="h-12.5 rounded-[20px]! px-6! text-base font-semibold"
              onClick={() => {
                if (me?.user) {
                  setBeProvider("true");
                } else {
                  router.push("/my-listings/add");
                }
                onClose();
              }}
            >
              <AddIcon className="size-5" />
              {dict.header.addAd}
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
