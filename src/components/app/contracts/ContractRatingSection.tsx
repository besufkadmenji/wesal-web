"use client";

import { ContractRatingForm } from "@/components/app/contracts/ContractRatingForm";
import { ContractRatingSummary } from "@/components/app/contracts/ContractRatingSummary";
import { ContractSectionTitle } from "@/components/app/contracts/ContractSectionTitle";
import type { Rating } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { Star } from "lucide-react";

/** Rating block on a completed contract (BRD 4.1.20.1). */
export const ContractRatingSection = ({
  contractId,
  rating,
  canRate,
  onRated,
}: {
  contractId: string;
  rating?: Pick<Rating, "rating" | "comment" | "status"> | null;
  canRate: boolean;
  onRated: () => void;
}) => {
  const dict = useDict();
  if (!rating && !canRate) return null;
  return (
    <section className="grid gap-4">
      <ContractSectionTitle icon={Star}>
        {dict.contracts.ratingTitle}
      </ContractSectionTitle>
      {rating ? (
        <ContractRatingSummary rating={rating} />
      ) : (
        <ContractRatingForm contractId={contractId} onRated={onRated} />
      )}
    </section>
  );
};
