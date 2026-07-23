"use client";

import ContractIcon from "@/assets/icons/contracts/popup/contract.svg";
import { ContractSectionTitle } from "@/components/app/contracts/ContractSectionTitle";
import { SignaturePreview } from "@/components/app/contracts/SignaturePreview";
import { useDict } from "@/hooks/useDict";

export const ContractSignaturesSection = ({
  customerSignature,
  providerSignature,
  completionSignature,
}: {
  customerSignature?: string;
  providerSignature?: string;
  completionSignature?: string;
}) => {
  const dict = useDict();
  return (
    <section className="grid gap-4">
      <ContractSectionTitle icon={ContractIcon}>
        {dict.contracts.electronicSignatures}
      </ContractSectionTitle>
      <div className="grid gap-3 rounded-2xl border border-[#f2f2f2] bg-[#fbfbfb] p-4 md:grid-cols-2">
        <SignaturePreview
          label={dict.contracts.signature}
          filename={customerSignature}
        />
        {providerSignature !== undefined && (
          <SignaturePreview
            label={dict.contracts.providerAcceptanceSignature}
            filename={providerSignature}
          />
        )}
        {completionSignature !== undefined && (
          <SignaturePreview
            label={dict.contracts.completionSignature}
            filename={completionSignature}
          />
        )}
      </div>
    </section>
  );
};
