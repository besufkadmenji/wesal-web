"use client";

import { ContractSectionTitle } from "@/components/app/contracts/ContractSectionTitle";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { Star } from "lucide-react";

export const ContractRatingPrompt = () => {
  const dict = useDict();
  return (
    <section className="grid gap-4">
      <ContractSectionTitle icon={Star}>
        {dict.contracts.ratingTitle}
      </ContractSectionTitle>
      <div className="grid justify-items-center gap-2 rounded-2xl border border-[#f2f2f2] bg-[#fbfbfb] p-4 text-center">
        <p className="text-base font-medium text-[#1a1a1a]">
          {dict.contracts.ratingPrompt}
        </p>
        <p className="text-gray text-sm">{dict.contracts.ratingDescription}</p>
        <Button
          type="button"
          aria-disabled="true"
          onClick={(event) => event.preventDefault()}
          variant="ghost"
          className="text-primary h-auto p-0 text-sm font-semibold"
        >
          {dict.contracts.rateContract}
        </Button>
      </div>
    </section>
  );
};
