"use client";

import { FavoriteButton } from "@/components/app/favorites/FavoriteButton";
import {
  ParticipantAvatar,
  EmptyState,
  LoadingList,
} from "@/components/app/shared/ParticipantUI";
import { useFavoriteProviders } from "@/hooks/useFavorites";
import { useDict } from "@/hooks/useDict";
import Link from "next/link";

export const FavoritesPage = () => {
  const dict = useDict();
  const favorites = useFavoriteProviders();
  return (
      <main className="grid gap-8">
          <h1 className="text-2xl font-semibold">
            {dict.favorites.title}
          </h1>
          {favorites.isLoading ? (
            <LoadingList rows={4} />
          ) : !favorites.data?.items.length ? (
            <EmptyState title={dict.favorites.empty} />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {favorites.data.items.map((favorite) => (
                <article
                  key={favorite.id}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-[20px] bg-white p-5 transition hover:shadow-sm"
                >
                  {/* ClickUp 869fnvz70: opens the provider's profile and ads. */}
                  <Link
                    href={`/providers/${favorite.providerId}?from=favorites`}
                    className="grid min-w-0 grid-cols-[auto_1fr] items-center gap-4"
                  >
                    <ParticipantAvatar
                      filename={favorite.provider.avatarFilename}
                      name={favorite.provider.name}
                      className="size-16"
                    />
                    <div className="min-w-0">
                      <h2 className="truncate font-semibold">
                        {favorite.provider.name}
                      </h2>
                      <p className="text-gray truncate text-sm">
                        {favorite.provider.commercialName ||
                          favorite.provider.address}
                      </p>
                    </div>
                  </Link>
                  <FavoriteButton providerId={favorite.providerId} iconOnly />
                </article>
              ))}
            </div>
          )}
      </main>
  );
};
