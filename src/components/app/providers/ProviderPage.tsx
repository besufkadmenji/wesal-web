"use client";

import {
  ListingCard,
  ListingCardSkeleton,
} from "@/components/app/listings/ListingCard";
import { ProviderPageHeader } from "@/components/app/providers/ProviderPageHeader";
import { ProviderSummaryCard } from "@/components/app/providers/ProviderSummaryCard";
import { useProviderPage } from "@/components/app/providers/useProviderPage";
import { AppPagination } from "@/components/app/shared/AppPagination";
import { AppWrapper } from "@/components/app/shared/AppWrapper";
import {
  EmptyState,
  LoadingList,
} from "@/components/app/shared/ParticipantUI";
import { useDict } from "@/hooks/useDict";

/**
 * A provider's public page: profile card and their ads (ClickUp 869fnvz70,
 * opened from Favorites).
 */
export const ProviderPage = () => {
  const dict = useDict();
  const { provider, listings, setPage } = useProviderPage();
  const ads = listings.data;

  return (
    <AppWrapper>
      <ProviderPageHeader />
      <div className="grid items-start gap-8 px-4 py-10 sm:px-8 lg:grid-cols-[minmax(260px,320px)_1fr] lg:px-[7vw] lg:py-20">
        {provider.isLoading ? (
          <LoadingList rows={1} />
        ) : provider.data ? (
          <ProviderSummaryCard provider={provider.data} />
        ) : (
          <EmptyState title={dict.providerPage.notFound} />
        )}

        <section className="grid gap-10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {listings.isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <ListingCardSkeleton key={index} />
                ))
              : ads?.items.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    href={`/listings/${listing.id}`}
                  />
                ))}
          </div>
          {!listings.isLoading && !ads?.items.length && provider.data && (
            <EmptyState title={dict.providerPage.noAds} />
          )}
          {ads && ads.meta.totalPages > 1 && (
            <AppPagination
              page={ads.meta.page}
              totalPages={ads.meta.totalPages}
              onChange={(page) => setPage(page)}
            />
          )}
        </section>
      </div>
    </AppWrapper>
  );
};
