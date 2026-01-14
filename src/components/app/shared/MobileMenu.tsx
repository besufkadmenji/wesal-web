import AddIcon from "@/assets/icons/add.circle.svg";
import MenuIcon from "@/assets/icons/menu.svg";
import { ChatPopover } from "@/components/app/shared/ChatPopover";
import { NotificationPopover } from "@/components/app/shared/NotificationPopover";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import {
  Drawer,
  DrawerContent,
  useDisclosure,
  Button as HeroButton,
} from "@heroui/react";
import { NavItem } from "@/components/app/shared/Header";
export const MobileMenu = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dict = useDict();
  return (
    <>
      <HeroButton onPress={onOpen} className="bg-white xl:hidden" isIconOnly>
        <MenuIcon className="size-8" />
      </HeroButton>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <div className="grid h-full grid-rows-[1fr_auto] p-8">
            <div className="grid grid-cols-1 auto-rows-max content-center items-center justify-items-center overflow-y-auto">
              <nav className="h-full grow justify-center grid grid-cols-1 gap-10">
                <NavItem label={dict.home.nav.home} href={"/"} />
                <NavItem
                  label={dict.home.nav.categories}
                  href={"/categories"}
                />
                <NavItem label={dict.home.nav.contracts} href={"/contracts"} />
                <NavItem
                  label={dict.home.nav.goodConnections}
                  href={"/good-connections"}
                />
                <NavItem
                  label={dict.home.nav.contactUs}
                  href={"/support/contact-us"}
                />
              </nav>
            </div>
            <Button
              variant={"secondary"}
              className="h-12.5 rounded-[20px]! px-6! text-base font-semibold"
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
