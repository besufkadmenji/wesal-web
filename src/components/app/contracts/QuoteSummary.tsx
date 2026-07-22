"use client";

import { MoneyValue } from "@/components/app/contracts/MoneyValue";
import { FormInput } from "@/components/app/profile/SignedContract/FormInput";
import type { ContractQuote } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";

export const QuoteSummary = ({ quote }: { quote: ContractQuote }) => {
  const dict = useDict();
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <FormInput
        label={dict.contracts.depositPercent}
        value={`${quote.depositPercent}%`}
      />
      <div className="grid h-23 grid-cols-1 gap-2 rounded-[16px] border border-[#f2f2f2] bg-[#fbfbfb] p-4">
        <p className="text-gray leading-7">{dict.contracts.depositValue}</p>
        <MoneyValue value={quote.downPayment} />
      </div>
      <div className="grid h-23 grid-cols-1 gap-2 rounded-[16px] border border-[#f2f2f2] bg-[#fbfbfb] p-4">
        <p className="text-gray leading-7">{dict.contracts.vat}</p>
        <MoneyValue value={quote.vatAmount} />
      </div>
      <div className="grid h-23 grid-cols-1 gap-2 rounded-[16px] border border-[#f2f2f2] bg-[#fbfbfb] p-4">
        <p className="text-gray leading-7">{dict.contracts.totalAfterTax}</p>
        <MoneyValue value={quote.totalPayable} />
      </div>
    </div>
  );
};
