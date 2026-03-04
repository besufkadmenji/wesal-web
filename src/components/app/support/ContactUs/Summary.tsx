import { useDict } from "@/hooks/useDict";
import Link from "next/link";
import { ReactNode } from "react";
import PhoneIcon from "@/assets/icons/phone.outline.svg";
import EmailIcon from "@/assets/icons/email.outline.svg";
import WhatsappIcon from "@/assets/icons/whatsapp.svg";
import TikTokIcon from "@/assets/icons/tiktok.svg";
import FacebookIcon from "@/assets/icons/facebook.svg";
import InstagramIcon from "@/assets/icons/instagram.svg";
import TwitterIcon from "@/assets/icons/twitter.svg";
import LinkedinIcon from "@/assets/icons/linkedin.svg";
import { useSetting } from "@/hooks/useSettings";
import { SocialMediaPlatform } from "@/gql/graphql";

export const Summary = () => {
  const dict = useDict();
  const { setting } = useSetting();
  const iconsMap: Record<SocialMediaPlatform, ReactNode> = {
    [SocialMediaPlatform.Facebook]: <FacebookIcon className="size-4" />,
    [SocialMediaPlatform.Instagram]: <InstagramIcon className="size-4" />,
    [SocialMediaPlatform.Twitter]: <TwitterIcon className="size-4" />,
    [SocialMediaPlatform.Linkedin]: <LinkedinIcon className="size-4" />,
    [SocialMediaPlatform.Tiktok]: <TikTokIcon className="size-4" />,
  };
  return (
    <div className="contact-gradient grid grid-cols-1 gap-6 rounded-[16px] p-6">
      <div className="grid grid-cols-1 justify-items-start gap-3">
        <h3 className="text-xl font-semibold text-white">
          {dict.support.contactUs.title}
        </h3>
        <p className="text-sm leading-6 text-white">
          {dict.support.contactUs.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 border-b-[0.25px] border-b-[#F2F2F2] pb-8">
        {setting?.phones.map((phone, index) => (
          <ContactMethod
            key={index}
            label={dict.footer.mobileNumber}
            icon={<PhoneIcon className="size-5" />}
            link={{
              href: `tel:+966${phone}`,
              text: `+966${phone}`,
              dir: "ltr",
            }}
          />
        ))}
        {setting?.email && setting?.email !== "" && (
          <ContactMethod
            label={dict.footer.email}
            icon={<EmailIcon className="size-5" />}
            link={{
              href: `mailto:${setting.email}`,
              text: setting.email,
            }}
          />
        )}
        {setting?.whatsappNumber && setting?.whatsappNumber !== "" && (
          <ContactMethod
            label={dict.footer.whatsapp}
            icon={<WhatsappIcon className="size-5" />}
            link={{
              href: `https://wa.me/+966${setting.whatsappNumber}`,
              text: `+966${setting.whatsappNumber}`,
              dir: "ltr",
            }}
          />
        )}
      </div>
      <div className="flex justify-start gap-7 flex-wrap">
        {setting?.socialMediaLinks?.map((link, index) => (
          <SocialLink
            key={index}
            icon={iconsMap[link.name as SocialMediaPlatform]}
            title={link.name}
            href={link.link}
          />
        ))}
      </div>
    </div>
  );
};

const ContactMethod = ({
  label,
  icon,
  link,
}: {
  label: string;
  icon: ReactNode;
  link: {
    href: string;
    text: string;
    dir?: "ltr" | "rtl";
  };
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="text-primary grid size-9.5 items-center justify-items-center rounded-[12px] bg-white">
        {icon}
      </div>
      <div className="grid grid-cols-1">
        <p className="text-sm leading-6 text-white">{label}</p>
        <Link
          href={link.href}
          className="text-base leading-8 font-medium text-white"
          dir={link.dir}
        >
          {link.text}
        </Link>
      </div>
    </div>
  );
};

const SocialLink = ({
  icon,
  title,
  href,
}: {
  icon: ReactNode;
  title: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      aria-label={title}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary grid size-9.5 items-center justify-items-center rounded-[12px] bg-white"
    >
      {icon}
    </Link>
  );
};
