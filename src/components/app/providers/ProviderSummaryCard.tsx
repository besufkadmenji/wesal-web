"use client";

import { FavoriteButton } from "@/components/app/favorites/FavoriteButton";
import { Ratings } from "@/components/app/listings/ListingDetail/MainInfo";
import { ProviderStat } from "@/components/app/providers/ProviderStat";
import { NewlyAddedChip } from "@/components/app/shared/NewlyAddedChip";
import { ParticipantAvatar } from "@/components/app/shared/ParticipantUI";
import type { PublicProviderQuery } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { BadgeCheck, LayoutGrid, MapPin } from "lucide-react";

type PublicProvider = NonNullable<PublicProviderQuery["provider"]>;

/** Side card of the provider page: who they are, where, and how active. */
export const ProviderSummaryCard = ({
  provider,
}: {
  provider: PublicProvider;
}) => {
  const dict = useDict();
  return (
    <aside className="grid gap-5 rounded-[20px] bg-white p-5">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
        <ParticipantAvatar
          filename={provider.avatarFilename}
          name={provider.name}
        />
        <div className="grid min-w-0 gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate font-semibold text-[#1a1a1a]">
              {provider.name}
            </h2>
            {provider.isNewlyAdded && <NewlyAddedChip />}
          </div>
          <Ratings
            rating={provider.ratingAverage}
            total={provider.ratingCount}
            classNames={{ rating: "size-4", info: "text-gray text-sm" }}
          />
        </div>
        <FavoriteButton providerId={provider.id} iconOnly />
      </div>
      <div className="grid gap-4">
        {provider.address && (
          <ProviderStat
            icon={<MapPin className="size-4" />}
            label={dict.providerPage.address}
            value={provider.address}
          />
        )}
        <ProviderStat
          icon={<LayoutGrid className="size-4" />}
          label={dict.providerPage.adsCount}
          value={`${provider.listingsCount ?? 0} ${dict.providerPage.adsUnit}`}
        />
        <ProviderStat
          icon={<BadgeCheck className="size-4" />}
          label={dict.providerPage.contractsCount}
          value={`${provider.contractsCount ?? 0} ${dict.providerPage.contractsUnit}`}
        />
      </div>
    </aside>
  );
};
