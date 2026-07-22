"use client";

import ShowMoreIcon from "@/assets/icons/show.more.svg";
import { Ratings } from "@/components/app/listings/ListingDetail/MainInfo";
import { Button } from "@/components/ui/button";
import { Provider } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import Image from "next/image";
import { FavoriteButton } from "@/components/app/favorites/FavoriteButton";
import { useMe } from "@/hooks/useMe";
import { useAppRouter } from "@/hooks/use.app.router";
import { ConversationService } from "@/services/conversation.service";
import { showErrorMessage } from "@/utils/show.messages";
import { useState } from "react";

export const ProviderData = ({
  provider,
  listingId,
}: {
  provider: Provider;
  listingId: string;
}) => {
  const dict = useDict();
  const { me } = useMe();
  const router = useAppRouter();
  const [busy, setBusy] = useState(false);
  const contact = async () => {
    if (!me?.user) {
      router.push(`/auth?action=login&returnTo=/listings/${listingId}`);
      return;
    }
    setBusy(true);
    try {
      const conversation = await ConversationService.create(listingId);
      router.push(`/conversations/${conversation.id}`);
    } catch (error) {
      showErrorMessage(
        error instanceof Error ? error.message : "Unable to start conversation",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="grid grid-cols-1 gap-6 rounded-[20px] bg-white p-5">
      <p>{dict.listingDetail.serviceProviderData}</p>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_auto]">
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <div className="relative size-14 rounded-full">
            <Image
              src={"/images/no.avatar.png"}
              alt="provider"
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-1 items-center gap-2">
            <p className="text-lg leading-5.25 font-medium text-[#1A1A1A]">
              {provider.name}
            </p>
            <Ratings
              rating={4.5}
              classNames={{
                rating: "size-4",
                info: "text-sm text-gray",
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 justify-self-start">
          <FavoriteButton providerId={provider.id} iconOnly />
          {!me?.provider && (
            <Button
              variant={"secondary"}
              className="h-12.5 gap-3 rounded-[20px] px-4!"
              disabled={busy}
              onClick={contact}
            >
              <p className="text-primary text-base font-semibold">
                {dict.listingDetail.contactProvider}
              </p>
              <ShowMoreIcon className="size-5 ltr:rotate-90" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
