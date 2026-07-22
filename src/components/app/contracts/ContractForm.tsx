"use client";

import InfoIcon from "@/assets/icons/contracts/info.svg";
import { ContractFormStepOne } from "@/components/app/contracts/ContractFormStepOne";
import { ContractFormStepTwo } from "@/components/app/contracts/ContractFormStepTwo";
import { ContractHero } from "@/components/app/contracts/ContractHero";
import { ContractFormSkeleton } from "@/components/app/contracts/ContractSkeletons";
import { useContractForm } from "@/components/app/contracts/useContractForm";
import { AppWrapper } from "@/components/app/shared/AppWrapper";

export const ContractForm = ({
  conversationId,
  rejectedContractId,
}: {
  conversationId?: string;
  rejectedContractId?: string;
}) => {
  const form = useContractForm({ conversationId, rejectedContractId });
  const {
    dict,
    resolvedConversationId,
    conversation,
    step,
    pageTitle,
    isLoading,
  } = form;

  if (isLoading) {
    return (
      <AppWrapper>
        <main className="bg-[#fcfdfe]">
          <ContractHero
            conversationId={resolvedConversationId}
            title={
              rejectedContractId ? dict.contracts.resend : dict.contracts.new
            }
          />
          <ContractFormSkeleton />
        </main>
      </AppWrapper>
    );
  }
  if (!conversation.data) return null;

  return (
    <AppWrapper>
      <main className="bg-[#fcfdfe]">
        <ContractHero
          conversationId={resolvedConversationId}
          title={pageTitle}
        />
        <div className="mx-auto grid max-w-[1232px] gap-6 px-4 py-12 md:px-8 xl:px-[7vw] xl:py-20">
          <header className="flex items-start gap-2 rounded-[20px] bg-white px-6 py-3">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
              <div className="flex items-center gap-1">
                <InfoIcon className="text-primary size-5 shrink-0" />
                <h1 className="text-primary text-lg font-medium">
                  {dict.contracts.formTitle}
                </h1>
              </div>
              <p className="text-gray max-w-[525px] text-base leading-[1.7]">
                {dict.contracts.formSubtitle}
              </p>
            </div>
            <div className="flex size-[60px] shrink-0 flex-col items-center justify-center rounded-[20px] bg-[#eff1f6]">
              <span className="text-primary text-center text-base leading-8 font-medium">
                {step}/2
              </span>
            </div>
          </header>

          {step === 1 ? (
            <ContractFormStepOne form={form} />
          ) : (
            <ContractFormStepTwo form={form} />
          )}
        </div>
      </main>
    </AppWrapper>
  );
};
