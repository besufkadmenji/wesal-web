"use client";

import { ContractDocumentView } from "@/components/app/contracts/ContractDocumentView";
import { ContractHero } from "@/components/app/contracts/ContractHero";
import { Button } from "@/components/ui/button";
import type { Contract } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { apiUrl } from "@/config/url";
import Cookies from "js-cookie";
import { useState } from "react";

export const CompletedContractDetailPage = ({
  contract,
}: {
  contract: Contract;
}) => {
  const dict = useDict();
  const [exporting, setExporting] = useState(false);

  const exportPdf = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const response = await fetch(`${apiUrl}/contract-documents/${contract.id}`, {
        headers: { Authorization: `Bearer ${Cookies.get("token") ?? ""}` },
      });
      if (!response.ok) throw new Error("Unable to download contract PDF");
      const url = URL.createObjectURL(await response.blob());
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `contract-${contract.publicId ?? contract.id}-v${contract.version}.pdf`;
      anchor.click();
      URL.revokeObjectURL(url);
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
