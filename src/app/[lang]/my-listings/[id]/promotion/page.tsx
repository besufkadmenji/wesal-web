import { PromotionPage } from "@/components/app/listings/my-listings/promotion/PromotionPage";

export default async function ListingPromotionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PromotionPage listingId={id} />;
}
