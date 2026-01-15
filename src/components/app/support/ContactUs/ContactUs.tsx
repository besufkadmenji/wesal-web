"use client";
import { SupportPageType, Wrapper } from "../Wrapper";
import { Summary } from "@/components/app/support/ContactUs/Summary";
import { ContactForm } from "@/components/app/support/ContactUs/ContactForm";
import { ContactMap } from "@/components/app/support/ContactUs/ContactMap";

export const ContactUs = () => {
  return (
    <Wrapper variant={SupportPageType.CONTACT_US}>
      <div className="grid auto-rows-max grid-cols-1 items-start gap-8 px-4 py-20 md:grid-cols-[auto_1fr] md:px-8 lg:px-[7vw] xl:grid-cols-[3fr_8fr]">
        <Summary />
        <ContactForm />
      </div>
      <ContactMap />
    </Wrapper>
  );
};
