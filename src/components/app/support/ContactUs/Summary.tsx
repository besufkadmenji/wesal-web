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

export const Summary = () => {
  const dict = useDict();
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
      <div className="grid grid-cols-1 border-b-[0.25px] gap-3 border-b-[#F2F2F2] pb-8">
        <ContactMethod
          label={dict.footer.mobileNumber}
          icon={<PhoneIcon className="size-5" />}
          link={{
            href: "tel:+966123456789",
            text: "+966 123456789",
            dir: "ltr",
          }}
        />
        <ContactMethod
          label={dict.footer.email}
          icon={<EmailIcon className="size-5" />}
          link={{
            href: "mailto:wesal2025@gmail.com",
            text: "wesal2025@gmail.com",
          }}
        />
        <ContactMethod
          label={dict.footer.whatsapp}
          icon={<WhatsappIcon className="size-5" />}
          link={{
            href: "https://wa.me/+966123456789",
            text: "+966 123456789",
            dir: "ltr",
          }}
        />
      </div>
      <div className="flex justify-between">
        <SocialLink
          icon={<TikTokIcon className="size-4" />}
          title={"TikTok"}
          href={"https://www.tiktok.com"}
        />
        <SocialLink
          icon={<LinkedinIcon className="size-4" />}
          title={"Linkedin"}
          href={"https://www.linkedin.com"}
        />
        <SocialLink
          icon={<InstagramIcon className="size-4" />}
          title={"Instagram"}
          href={"https://www.instagram.com"}
        />
        <SocialLink
          icon={<TwitterIcon className="size-4" />}
          title={"Twitter"}
          href={"https://www.twitter.com"}
        />
        <SocialLink
          icon={<FacebookIcon className="size-4" />}
          title={"Facebook"}
          href={"https://www.facebook.com"}
        />
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
