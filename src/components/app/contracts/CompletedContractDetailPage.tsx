"use client";

import { ContractDocumentView } from "@/components/app/contracts/ContractDocumentView";
import { ContractInvoiceButton } from "@/components/app/contracts/ContractInvoiceButton";
import { downloadContractPdf } from "@/components/app/contracts/downloadContractPdf";
import { ContractHero } from "@/components/app/contracts/ContractHero";
import { ContractRatingSection } from "@/components/app/contracts/ContractRatingSection";
import { Button } from "@/components/ui/button";
import type { Contract } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { useState } from "react";

export const CompletedContractDetailPage = ({
  contract,
  canRate,
  onRated,
}: {
  contract: Contract;
  canRate: boolean;
  onRated: () => void;
}) => {
  const dict = useDict();
  const [exporting, setExporting] = useState(false);

  const exportPdf = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      await downloadContractPdf(
        `/contract-documents/${contract.id}`,
        `contract-${contract.publicId ?? contract.id}-v${contract.version}.pdf`,
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <ContractHero
        title={dict.contracts.title}
        breadcrumbHref="/"
        breadcrumbLabel={dict.home.nav.home}
      />
      <div className="mx-auto grid max-w-[1232px] gap-6 px-4 py-12 md:px-8 xl:px-[7vw] xl:py-20">
        <ContractDocumentView contract={contract} />
        <ContractRatingSection
          contractId={contract.id}
          rating={contract.rating}
          canRate={canRate}
          onRated={onRated}
        />
        <div className="flex flex-wrap justify-center gap-4">
          <ContractInvoiceButton
            contract={contract}
            className="w-full max-w-[285px] px-6"
          />
          <Button
            type="button"
            className="h-[50px] w-full max-w-[285px] rounded-[20px] px-6 text-base font-semibold text-[#eff9f0]"
            disabled={exporting}
            onClick={exportPdf}
          >
            {dict.contracts.exportPdf}
          </Button>
        </div>
      </div>
    </>
  );
};
