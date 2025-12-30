import Image from "next/image";
import ContactDot from "@/assets/icons/contact.dot.svg";
import { useDict } from "@/hooks/useDict";
import { Button } from "@/components/ui/button";
import ContactPhone from "@/assets/icons/contact.call.svg";
import ContactMessage from "@/assets/icons/contact.message.svg";
export const ContactUs = () => {
  const dict = useDict();
  return (
    <div className="relative grid h-104.5 w-full grid-cols-1 justify-items-center px-[15vw]">
      <Image
        src={"/images/contact.us.bg.svg"}
        alt="Trusted"
        className="w-full object-cover"
        fill
      />
      <div className="z-10 grid w-[65vw] auto-rows-max grid-cols-1 items-start justify-items-center gap-8 py-20">
        <div className="grid grid-cols-1 justify-items-center gap-6">
          <div className="grid grid-cols-1 justify-items-center gap-4">
            <div className="flex items-center justify-center gap-4">
              <ContactDot className="w-14.5" />
              <h3 className="text-app-green text-lg font-semibold">
                {dict.home.contactUs.subtitle}
              </h3>
              <ContactDot className="w-14.5" />
            </div>
            <h2 className="text-4xl font-semibold text-black">
              {dict.home.contactUs.title}
            </h2>
          </div>
          <p className="text-gray text-center text-xl leading-9">
            {dict.home.contactUs.description}
          </p>
        </div>
        <div className="grid w-[40vw] grid-cols-2 gap-4">
          <Button className="h-12.5 gap-2 rounded-[20px] px-6 font-semibold">
            <ContactMessage className="size-5" />
            {dict.home.contactUs.contactButton}
          </Button>
          <Button className="hover:bg-primary/15 text-primary h-12.5 gap-2 rounded-[20px] bg-[#DFE2EC] px-6 font-semibold">
            <ContactPhone className="size-6" />
            {dict.home.contactUs.callButton}
          </Button>
        </div>
      </div>
    </div>
  );
};
