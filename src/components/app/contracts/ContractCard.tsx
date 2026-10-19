"use client";

import DocumentIcon from "@/assets/icons/contracts/document.svg";
import { ContractCardDates } from "@/components/app/contracts/ContractCardDates";
import { ContractStatusPill } from "@/components/app/contracts/ContractStatusPill";
import { MoneyValue } from "@/components/app/contracts/MoneyValue";
import { formatContractReference } from "@/components/app/contracts/formatContract";
import { ContractStatus, type Contract } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { CircleDollarSign, MessagesSquare } from "lucide-react";
import Link from "next/link";

export const ContractCard = ({
  contract,
  isProvider,
  onOpenContract,
}: {
  contract: Contract;
  isProvider?: boolean;
  onOpenContract?: (contract: Contract) => void;
}) => {
  const dict = useDict();
  // Completed contracts use the document page for PDF export. Provider-pending
  // contracts retain their acceptance workflow; all other statuses use a popup.
  const opensContractDialog = Boolean(
    onOpenContract &&
    contract.status !== ContractStatus.Completed &&
    !(isProvider && contract.status === ContractStatus.Pending),
  );
  const cardDetails = (
    <>
      <header className="flex h-20 items-center justify-between gap-3 bg-[#fbfbfb] p-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="text-primary grid size-10 shrink-0 place-content-center rounded-xl bg-[#eff1f6]">
            <DocumentIcon className="size-6" />
          </span>
          <div className="min-w-0 text-start">
            <h2
              dir="auto"
              className="text-page-start truncate text-base leading-8 font-medium text-[#1a1a1a]"
            >
              {contract.conversation.listing.name}
            </h2>
            <p className="text-gray truncate text-sm leading-[1.7]" dir="ltr">
              {formatContractReference(contract)}
            </p>
          </div>
        </div>
        <ContractStatusPill status={contract.status} />
      </header>

      <div className="mt-4 flex items-center gap-1 px-3">
        <CircleDollarSign className="text-gray size-[18px] shrink-0" />
        <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
          <p className="text-gray shrink-0 text-sm leading-[1.7]">
            {dict.contracts.agreedPrice}
          </p>
          <MoneyValue
            value={contract.agreedPrice}
            className="min-w-0"
            amountClassName="truncate text-xl leading-8 font-medium text-primary"
            currencyClassName="text-lg"
          />
        </div>
      </div>
      <ContractCardDates contract={contract} />
    </>
  );

  return (
    <article className="group flex h-[254px] flex-col gap-4 overflow-hidden rounded-[20px] border border-[#f2f2f2] bg-white pb-3 transition hover:-translate-y-0.5 hover:shadow-sm">
      {opensContractDialog ? (
        <button
          type="button"
          className="block w-full cursor-pointer text-start"
          onClick={() => onOpenContract?.(contract)}
        >
          {cardDetails}
        </button>
      ) : (
        <Link href={`/contracts/${contract.id}`} className="block">
          {cardDetails}
        </Link>
      )}

      <Link
        href={`/conversations/${contract.conversationId}`}
        className="bg-primary mx-3 mt-auto flex h-[50px] shrink-0 items-center justify-center gap-2 rounded-[20px] text-base font-semibold text-white transition hover:opacity-90"
      >
        <MessagesSquare className="size-5" />
        {dict.contracts.conversation}
      </Link>
    </article>
  );
};
