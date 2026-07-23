"use client";

import { ContractDocumentView } from "@/components/app/contracts/ContractDocumentView";
import { ContractHero } from "@/components/app/contracts/ContractHero";
import { Button } from "@/components/ui/button";
import type { Contract } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { downloadPDF } from "@/utils/download.pdf";
import { useRef, useState } from "react";

export const CompletedContractDetailPage = ({
  contract,
}: {
  contract: Contract;
}) => {
  const dict = useDict();
  const documentRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const exportPdf = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      await downloadPDF(documentRef);
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
        <ContractDocumentView ref={documentRef} contract={contract} />
        <div className="flex justify-center">
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
