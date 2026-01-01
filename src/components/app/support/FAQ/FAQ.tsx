"use client";
import { useDict } from "@/hooks/useDict";
import { ContactUs } from "../../home/ContactUs";
import { SupportPageType, Wrapper } from "../Wrapper";
import AboutDot from "@/assets/icons/about.dot.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

export const FAQ = () => {
  const dict = useDict();
  const [value, setValue] = useState<string[]>([]);
  return (
    <Wrapper variant={SupportPageType.FAQ}>
      <div className="grid grid-cols-1 gap-10 px-[7vw] py-20">
        <div className="grid grid-cols-1 justify-items-center gap-4">
          <div className="flex items-center justify-center gap-4">
            <AboutDot className="w-14.5" />
            <h3 className="text-app-green text-lg font-semibold">
              {dict.support.faq.title}
            </h3>
            <AboutDot className="w-14.5" />
          </div>
          <h2 className="max-w-2xl text-center text-2xl font-semibold text-black">
            {dict.support.faq.subtitle}
          </h2>
        </div>
        <Accordion
          type="multiple"
          value={value}
          onValueChange={(v) => {
            console.log("value", v);
            setValue(v);
          }}
          className="grid grid-cols-2 gap-x-4 gap-y-6"
        >
          {dict.support.faq.faqs.map((item, index) => (
            <AccordionItem
              value={item.question}
              key={index}
              className="border-border self-start rounded-[16px] border p-4 pt-0"
            >
              <AccordionTrigger
                isActive={value.includes(item.question)}
                className="text-xl leading-8 font-medium"
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray text-base leading-7">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <ContactUs />
    </Wrapper>
  );
};
