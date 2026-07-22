"use client";

import { AppWrapper } from "@/components/app/shared/AppWrapper";
import {
  EmptyState,
  LoadingList,
  StatusBadge,
  useLocalizedFormat,
} from "@/components/app/shared/ParticipantUI";
import { Button } from "@/components/ui/button";
import { ListingType, PromotionStatus, type Listing } from "@/gql/graphql";
import { queryKeys } from "@/hooks/queryKeys";
import { useSetting } from "@/hooks/useSettings";
import { useDict } from "@/hooks/useDict";
import ListingService from "@/services/listing.service";
import { PromotionService } from "@/services/promotion.service";
import {
  showErrorMessage,
  showSuccessMessage,
} from "@/utils/show.messages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Clock3, Sparkles } from "lucide-react";
import Link from "next/link";

export const useOwnerListing = (id: string) =>
  useQuery({
    queryKey: queryKeys.ownerListing(id),
    queryFn: async () => {
      const result = await ListingService.myListings({ page: 1, limit: 100 });
      return result?.items.find((listing) => listing.id === id) || null;
    },
  });

export const PromotionPage = ({ listingId }: { listingId: string }) => {
  const dict = useDict();
  const format = useLocalizedFormat();
  const queryClient = useQueryClient();
  const listing = useOwnerListing(listingId);
  const setting = useSetting();
  const request = useMutation({
    mutationFn: () => PromotionService.request(listingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ownerListing(listingId) });
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
    onError: (error) => showErrorMessage(error.message),
  });
  const pay = useMutation({
    mutationFn: () => PromotionService.pay(listingId),
    onSuccess: () => {
      showSuccessMessage(dict.promotion.success);
      queryClient.invalidateQueries({ queryKey: queryKeys.ownerListing(listingId) });
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.setting });
    },
    onError: (error) => showErrorMessage(error.message),
  });
  if (listing.isLoading || setting.isLoading)
    return (
      <AppWrapper>
        <main className="bg-[#fcfdfe] px-4 py-12 md:px-8 xl:px-[7vw]">
          <LoadingList rows={5} />
        </main>
      </AppWrapper>
    );
  if (!listing.data)
    return (
      <AppWrapper>
        <EmptyState title={dict.common.empty} />
      </AppWrapper>
    );
  const item = listing.data;
  const active = item.promotionStatus === PromotionStatus.Active;
  const pending = item.promotionStatus === PromotionStatus.PendingPayment;
  const canRequest = [PromotionStatus.None, PromotionStatus.Expired].includes(
    item.promotionStatus,
  );
  return (
    <AppWrapper>
      <main className="bg-[#fcfdfe] px-4 py-12 md:px-8 xl:px-[7vw] xl:py-20">
        <div className="mx-auto grid max-w-3xl gap-6">
          <section className="grid justify-items-center gap-5 rounded-[24px] bg-white p-7 text-center md:p-10">
            <div className="bg-primary/5 text-primary grid size-20 place-content-center rounded-full">
              {active ? <CheckCircle2 className="size-10" /> : <Sparkles className="size-10" />}
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{dict.promotion.title}</h1>
              <p className="text-gray mt-2">{item.name}</p>
            </div>
            <StatusBadge status={item.promotionStatus} />
            <div className="grid w-full gap-3 rounded-[18px] bg-[#f8f9fb] p-5 text-sm">
              <Row label={dict.promotion.fee} value={format.money(setting.setting?.premiumAdFee || 0)} />
              <Row label={dict.promotion.duration} value={`${setting.setting?.premiumAdDurationDays || 30} ${dict.common.days}`} />
              <Row label={dict.conversations.cycle} value={String(item.promotionCycle)} />
              {item.featuredStartsAt && <Row label={dict.status.ACTIVE} value={format.date(item.featuredStartsAt)} />}
              {item.featuredEndsAt && <Row label={dict.status.EXPIRED} value={format.date(item.featuredEndsAt)} />}
            </div>
            {!setting.setting?.premiumAdEnabled && !active ? (
              <p className="rounded-[14px] bg-amber-50 p-4 text-sm text-amber-700">
                {dict.promotion.disabled}
              </p>
            ) : pending ? (
              <Button
                className="h-13 rounded-[16px] px-9"
                disabled={pay.isPending}
                onClick={() => pay.mutate()}
              >
                {dict.common.payNow}
              </Button>
            ) : canRequest ? (
              <Button
                className="h-13 rounded-[16px] px-9"
                disabled={request.isPending}
                onClick={() => request.mutate()}
              >
                {dict.promotion.promote}
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-emerald-700">
                <Clock3 className="size-5" />
                {dict.promotion.success}
              </div>
            )}
            <Button variant="outline" asChild className="rounded-[14px]">
              <Link href="/my-listings">{dict.home.nav.myListings}</Link>
            </Button>
          </section>
        </div>
      </main>
    </AppWrapper>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4">
    <span className="text-gray">{label}</span>
    <strong>{value}</strong>
  </div>
);

export const PromotionAction = ({ listing }: { listing: Listing }) => {
  const dict = useDict();
  if (
    listing.type === ListingType.Featured ||
    listing.promotionStatus !== PromotionStatus.None
  ) {
    return (
      <Button asChild variant="outline" className="mt-3 w-full rounded-[14px] bg-white">
        <Link href={`/my-listings/${listing.id}/promotion`}>
          {listing.promotionStatus === PromotionStatus.Active
            ? dict.promotion.active
            : listing.promotionStatus === PromotionStatus.PendingPayment
              ? dict.promotion.pending
              : dict.promotion.promote}
        </Link>
      </Button>
    );
  }
  return (
    <Button asChild variant="outline" className="mt-3 w-full rounded-[14px] bg-white">
      <Link href={`/my-listings/${listing.id}/promotion`}>
        {dict.promotion.promote}
      </Link>
    </Button>
  );
};
