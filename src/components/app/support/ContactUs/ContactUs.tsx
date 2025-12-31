"use client";
import { SupportPageType, Wrapper } from "../Wrapper";
import { Summary } from "@/components/app/support/ContactUs/Summary";
import { ContactForm } from "@/components/app/support/ContactUs/ContactForm";
import { ContactMap } from "@/components/app/support/ContactUs/ContactMap";

export const ContactUs = () => {
  return (
    <Wrapper variant={SupportPageType.CONTACT_US}>
      <div className="grid auto-rows-max grid-cols-[3fr_8fr] items-start gap-8 px-[7vw] py-20">
        <Summary />
        <ContactForm />
      </div>
      <ContactMap />
    </Wrapper>
  );
};
