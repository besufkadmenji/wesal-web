"use client";

import tabbyLogo from "@/assets/images/payments/tabby.png";
import tamaraLogo from "@/assets/images/payments/tamara.png";
import visaLogo from "@/assets/images/payments/visa.png";
import { MoneyValue } from "@/components/app/contracts/MoneyValue";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Contract } from "@/gql/graphql";
import { queryKeys } from "@/hooks/queryKeys";
import { useDict } from "@/hooks/useDict";
import { cn } from "@/lib/utils";
import { ContractService } from "@/services/contract.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WalletCards, X } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

type MockPaymentMethod = "ELECTRONIC" | "TABBY" | "TAMARA";

export const ContractPaymentDialog = ({
  contract,
  open,
  onOpenChange,
  onPaid,
}: {
  contract: Contract;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaid: () => void;
}) => {
  const dict = useDict();
  const queryClient = useQueryClient();
  const [method, setMethod] = useState<MockPaymentMethod>("TABBY");

  const payment = useMutation({
    mutationFn: () => ContractService.pay(contract.id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.contracts }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.contract(contract.id),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.conversation(contract.conversationId),
        }),
      ]);
      showSuccessMessage(dict.contracts.paid);
      setMethod("TABBY");
      onOpenChange(false);
      onPaid();
    },
    onError: (error) => showErrorMessage(error.message),
  });

  const methods: Array<{
    value: MockPaymentMethod;
    label: string;
    logo: StaticImageData;
    logoClassName: string;
    imageClassName?: string;
  }> = [
    {
      value: "ELECTRONIC",
      label: dict.contracts.electronicPayment,
      logo: visaLogo,
      logoClassName: "h-[21px] w-[46px]",
      imageClassName:
        "absolute -left-[36.5%] -top-[70%] h-[240%] w-[202%] max-w-none",
    },
    {
      value: "TABBY",
      label: dict.contracts.tabbyInstallments,
      logo: tabbyLogo,
      logoClassName: "h-[15px] w-[46px]",
      imageClassName:
        "absolute -left-1/4 -top-[84%] h-[365%] w-[151%] max-w-none",
    },
    {
      value: "TAMARA",
      label: dict.contracts.tamaraInstallments,
      logo: tamaraLogo,
      logoClassName: "h-[15px] w-[46px]",
    },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) setMethod("TABBY");
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="gap-7 rounded-[20px] border-0 bg-white px-6 py-10 shadow-xl sm:max-w-[657px]"
      >
        <div className="flex items-start gap-6">
          <div className="min-w-0 flex-1">
            <div className="grid gap-2 text-start">
              <div className="flex flex-wrap items-center gap-1">
                <DialogTitle className="text-xl leading-8 font-semibold text-[#1a1a1a]">
                  {dict.contracts.paymentTitle}
                </DialogTitle>
                <MoneyValue
                  value={contract.totalPayable}
                  amountClassName="text-xl font-semibold text-[#1a1a1a]"
                  currencyClassName="text-xl"
                />
              </div>
              <DialogDescription className="text-gray text-base leading-[1.7]">
                {dict.contracts.paymentDescription}
              </DialogDescription>
            </div>

            <div
              role="radiogroup"
              aria-label={dict.contracts.paymentMethod}
              className="mt-4 grid gap-4"
            >
              {methods.map((option) => {
                const selected = method === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={cn(
                      "flex h-14 w-full items-center gap-2 rounded-[20px] border px-4 text-sm transition",
                      selected
                        ? "border-primary text-primary bg-[#eff1f6]"
                        : "border-[#f2f2f2] bg-white text-[#1a1a1a] hover:bg-[#fbfbfb]",
                    )}
                    onClick={() => setMethod(option.value)}
                  >
                    <span
                      className={cn(
                        "relative shrink-0 overflow-hidden",
                        option.logoClassName,
                      )}
                    >
                      <Image
                        src={option.logo}
                        alt=""
                        fill={!option.imageClassName}
                        sizes="46px"
                        className={
                          option.imageClassName || "object-cover object-center"
                        }
                      />
                    </span>
                    <span className="min-w-0 flex-1 text-start">
                      {option.label}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-5 shrink-0 place-content-center rounded-full border-2",
                        selected ? "border-primary" : "border-[#999]",
                      )}
                    >
                      {selected && (
                        <span className="bg-primary size-2.5 rounded-full" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <span className="text-primary grid size-[60px] shrink-0 place-content-center rounded-2xl bg-[#eff1f6]">
            <WalletCards className="size-[30px]" />
          </span>
        </div>

        <div dir="ltr" className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <Button
              type="button"
              disabled={payment.isPending}
              className="h-[50px] rounded-[20px] bg-[#f2f2f2] text-base font-semibold text-[#4d4d4d] shadow-none hover:bg-[#e9e9e9]"
            >
              {dict.common.cancel}
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={payment.isPending}
            onClick={() => payment.mutate()}
            className="bg-primary h-[50px] rounded-[20px] text-base font-semibold text-white"
          >
            {payment.isPending
              ? dict.contracts.paymentProcessing
              : dict.contracts.continuePayment}
          </Button>
        </div>

        <DialogClose className="text-gray absolute end-6 top-6 grid size-8 place-content-center rounded-full border border-[#f2f2f2] bg-white transition hover:bg-[#f8f9fb]">
          <X className="size-4" />
          <span className="sr-only">{dict.common.cancel}</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
