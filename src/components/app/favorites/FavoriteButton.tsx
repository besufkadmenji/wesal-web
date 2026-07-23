"use client";

import MessageHeartFilledIcon from "@/assets/icons/message.heart.filled.svg";
import MessageHeartIcon from "@/assets/icons/message.heart.svg";
import { Button } from "@/components/ui/button";
import { queryKeys } from "@/hooks/queryKeys";
import { useDict } from "@/hooks/useDict";
import { useFavoriteState } from "@/hooks/useFavorites";
import { useMe } from "@/hooks/useMe";
import { cn } from "@/lib/utils";
import { FavoriteService } from "@/services/favorite.service";
import { showErrorMessage } from "@/utils/show.messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const FavoriteButton = ({
  providerId,
  iconOnly = false,
  className,
}: {
  providerId: string;
  iconOnly?: boolean;
  className?: string;
}) => {
  const { me } = useMe();
  const dict = useDict();
  const queryClient = useQueryClient();
  const favorite = useFavoriteState(providerId);
  const mutation = useMutation({
    mutationFn: (next: boolean) =>
      FavoriteService.setFavorite(providerId, next),
    onSuccess: (_, next) => {
      queryClient.setQueryData(queryKeys.favorite(providerId), next);
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites });
    },
    onError: (error) => showErrorMessage(error.message),
  });
  if (!me?.user) return null;
  const active = Boolean(favorite.data);
  const label = active ? dict.favorites.remove : dict.favorites.add;
  return (
    <Button
      type="button"
      variant="outline"
      size={iconOnly ? "icon" : "default"}
      aria-label={label}
      title={label}
      disabled={favorite.isLoading || mutation.isPending}
      onClick={() => mutation.mutate(!active)}
      className={cn("size-9.5 rounded-[12px] bg-white", className)}
    >
      {active ? (
        <MessageHeartFilledIcon className="size-6" />
      ) : (
        <MessageHeartIcon className="size-6" />
      )}
      {!iconOnly && label}
    </Button>
  );
};
