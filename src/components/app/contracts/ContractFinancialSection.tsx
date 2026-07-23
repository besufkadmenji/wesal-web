"use client";

import FinanceIcon from "@/assets/icons/contracts/popup/finance.svg";
import { ContractSectionTitle } from "@/components/app/contracts/ContractSectionTitle";
import { FinancialRow } from "@/components/app/contracts/FinancialRow";
import { MoneyValue } from "@/components/app/contracts/MoneyValue";
import { type Contract } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";

export const ContractFinancialSection = ({
  contract,
}: {
  contract: Contract;
}) => {
  const dict = useDict();
  return (
    <section className="grid gap-4">
      <ContractSectionTitle icon={FinanceIcon}>
        {dict.contracts.financialDetails}
      </ContractSectionTitle>
      <div className="grid gap-3 rounded-2xl border border-[#f2f2f2] bg-[#fbfbfb] p-4">
        <FinancialRow
          label={dict.contracts.agreedPrice}
          value={contract.agreedPrice}
        />
        <FinancialRow
          label={`${dict.contracts.vat} (${contract.vatRate}%)`}
          value={contract.vatAmount}
        />
        <FinancialRow
          label={`${dict.contracts.commission} (${contract.commissionPercent}%)`}
          value={contract.commissionAmount}
        />
        <div className="my-1 h-px bg-[#f2f2f2]" />
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg leading-8 font-medium text-[#1a1a1a]">
            {dict.contracts.financialTotal}
          </span>
          <MoneyValue
            value={contract.totalPayable}
            amountClassName="text-xl font-medium text-primary"
            currencyClassName="text-xl"
          />
        </div>
      </div>
    </section>
  );
};
