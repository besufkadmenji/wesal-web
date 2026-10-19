"use client";

import { downloadContractPdf } from "@/components/app/contracts/downloadContractPdf";
import { Button } from "@/components/ui/button";
import type { Contract } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import { cn } from "@/lib/utils";
import { showErrorMessage } from "@/utils/show.messages";
import { useState } from "react";

/**
 * S4-57: the paying customer's tax invoice, once the contract is paid. No
 * Figma design yet (D-23), so it uses the secondary button style.
 */
export const ContractInvoiceButton = ({
  contract,
  className,
}: {
  contract: Pick<Contract, "id" | "publicId" | "paidAt" | "clientId">;
  className?: string;
}) => {
  const dict = useDict();
  const lang = useLang();
  const { me } = useMe();
  const [downloading, setDownloading] = useState(false);
  if (!contract.paidAt || !me?.user || me.user.id !== contract.clientId) {
    return null;
  }

  const download = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await downloadContractPdf(
        `/contract-documents/${contract.id}/invoice?language=${lang === "en" ? "en" : "ar"}`,
        `invoice-INV-${contract.publicId ?? contract.id}.pdf`,
      );
    } catch (error) {
      showErrorMessage(
        error instanceof Error && error.message !== "Download failed"
          ? error.message
          : dict.contracts.invoiceError,
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      disabled={downloading}
      onClick={download}
      className={cn(
        "border-primary text-primary h-12.5 rounded-[20px] bg-white text-base font-semibold",
        className,
      )}
    >
      {dict.contracts.downloadInvoice}
    </Button>
  );
};
