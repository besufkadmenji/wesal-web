"use client";

import { queryKeys } from "@/hooks/queryKeys";
import { useMe } from "@/hooks/useMe";
import { FavoriteService } from "@/services/favorite.service";
import { useQuery } from "@tanstack/react-query";

export const useFavoriteState = (providerId?: string) => {
  const { me } = useMe();
  return useQuery({
    queryKey: queryKeys.favorite(providerId || ""),
    queryFn: () => FavoriteService.isFavorite(providerId!),
    enabled: Boolean(me?.user && providerId),
  });
};

export const useFavoriteProviders = () =>
  useQuery({
    queryKey: queryKeys.favorites,
    queryFn: () => FavoriteService.findAll({ page: 1, limit: 24 }),
  });
