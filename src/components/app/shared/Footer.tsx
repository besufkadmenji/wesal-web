import { useDict } from "@/hooks/useDict";
import LogoIcon from "@/assets/icons/logo.svg";
import Link from "next/link";
import { ReactNode } from "react";
import TikTokIcon from "@/assets/icons/tiktok.svg";
import FacebookIcon from "@/assets/icons/facebook.svg";
import InstagramIcon from "@/assets/icons/instagram.svg";
import TwitterIcon from "@/assets/icons/twitter.svg";
import LinkedinIcon from "@/assets/icons/linkedin.svg";
import PhoneIcon from "@/assets/icons/phone.outline.svg";
import EmailIcon from "@/assets/icons/email.outline.svg";
import WhatsappIcon from "@/assets/icons/whatsapp.svg";

export const Footer = () => {
  const dict = useDict();
  return (
    <footer className="footer-gradient grid-cols-1 items-start px-[7vw] md:py-20 py-10">
      <div className="relative grid grid-cols-2 items-start gap-13 border-b-[.25px] border-b-[#F2F2F2] pb-8 md:grid-cols-3 xl:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <AboutUsSummary />
        <FooterLinks
          title={dict.footer.staticPages}
          links={[
            {
              label: dict.footer.home,
              href: "/",
            },
            {
              label: dict.footer.categories,
              href: "/categories",
            },
            {
              label: dict.footer.myContracts,
              href: "/my-contracts",
            },
          ]}
        />
        <FooterLinks
          title={dict.footer.quickLinks}
          links={[
            {
              label: dict.footer.faq,
              href: "/support/faq",
            },
            {
              label: dict.footer.contactUs,
              href: "/support/contact-us",
            },
            {
              label: dict.footer.aboutPlatform,
              href: "/support/about-us",
            },
          ]}
        />
        <FooterLinks title={dict.footer.contactMethods}>
          <div className="grid grid-cols-1 gap-6">
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
        </FooterLinks>
      </div>
      <div className="grid grid-cols-1 items-center justify-between justify-items-center gap-6 pt-8.5 md:flex">
        <p className="text-base font-semibold text-white">
          {dict.footer.copyrightText} &copy; {new Date().getFullYear()}
        </p>
        <ul className="flex list-disc gap-x-10 gap-y-6">
          <li className="text-sm leading-6 font-medium text-white">
            <Link href="/support/terms">{dict.footer.terms}</Link>
          </li>
          <li className="text-sm leading-6 font-medium text-white">
            <Link href="/support/privacy-policy">{dict.footer.privacy}</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

const FooterLinks = ({
  title,
  children,
  links,
}: {
  title: string;
  links?: {
    label: string;
    href: string;
  }[];
  children?: ReactNode;
}) => {
  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="grid gap-2">
        <p className="text-base leading-8 font-medium text-white">{title}</p>
        <div className="bg-app-green h-0.5 w-14" />
      </div>
      {links && (
        <ul className="mr-auto ml-4 grid list-disc gap-2 rtl:mr-4 rtl:ml-auto">
          {links.map((link) => (
            <li
              key={link.href}
              className="text-sm leading-6 font-medium text-white"
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      )}
      {children && children}
    </div>
  );
};

const AboutUsSummary = () => {
  const dict = useDict();
  return (
    <div className="col-span-2 grid grid-cols-1 gap-9 md:col-span-3 xl:col-span-1">
      <div className="grid grid-cols-1 gap-5">
        <LogoIcon className="size-20 text-white" />
        <p className="text-base leading-7 text-white">{dict.footer.aboutUs}</p>
      </div>
      <div className="flex items-center gap-4">
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
      className="grid size-9.5 items-center justify-items-center rounded-[12px] bg-white/5 text-white"
    >
      {icon}
    </Link>
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
      <div className="grid size-9.5 items-center justify-items-center rounded-[12px] bg-white/5 text-white">
        {icon}
      </div>
      <div className="grid grid-cols-1 gap-2">
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
