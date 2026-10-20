import ComplaintIcon from "@/assets/icons/notifications/complaint.svg";
import ListingIcon from "@/assets/icons/notifications/listing.svg";
import PayCoinIcon from "@/assets/icons/notifications/pay.coin.svg";
import PayHandIcon from "@/assets/icons/notifications/pay.hand.svg";
import StatusIcon from "@/assets/icons/notifications/status.svg";
import { NotificationType } from "@/gql/graphql";
import {
  Award,
  Bell,
  LayoutGrid,
  Megaphone,
  MessagesSquare,
  Star,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

/** Figma "pay" icon: a hand and a coin, placed as in the design. */
const PayIcon = () => (
  <span className="relative block size-5">
    <PayHandIcon className="absolute inset-[56.08%_2.55%_0_2.55%]" />
    <PayCoinIcon className="absolute inset-[0_4.88%_54.23%_49.96%]" />
  </span>
);

const FIGMA_ICONS: Partial<Record<NotificationType, () => ReactNode>> = {
  [NotificationType.ListingFeatured]: () => <ListingIcon className="size-5" />,
  [NotificationType.ListingFeaturedExpired]: () => (
    <ListingIcon className="size-5" />
  ),
  [NotificationType.ListingApproved]: () => <ListingIcon className="size-5" />,
  [NotificationType.ContractUpdate]: () => <StatusIcon className="size-5" />,
  [NotificationType.ContractCreated]: () => <StatusIcon className="size-5" />,
  [NotificationType.ContractOverdue]: () => <StatusIcon className="size-5" />,
  [NotificationType.PaymentReceived]: () => <StatusIcon className="size-5" />,
  [NotificationType.ChatFeePaid]: PayIcon,
  [NotificationType.PayoutTransferred]: PayIcon,
  [NotificationType.RefundIssued]: PayIcon,
  [NotificationType.PaymentCompleted]: PayIcon,
  [NotificationType.ComplaintResponse]: () => (
    <ComplaintIcon className="size-5" />
  ),
  [NotificationType.ComplaintResolved]: () => (
    <ComplaintIcon className="size-5" />
  ),
};

// Types with no icon in the Figma notification list.
const FALLBACK_ICONS: Partial<Record<NotificationType, LucideIcon>> = {
  [NotificationType.ChatStarted]: MessagesSquare,
  [NotificationType.ChatEnded]: MessagesSquare,
  [NotificationType.NewMessage]: MessagesSquare,
  [NotificationType.NewRating]: Star,
  [NotificationType.BadgeChanged]: Award,
  [NotificationType.BadgeWarning]: Award,
  [NotificationType.SystemAnnouncement]: Megaphone,
};

/**
 * The 40px rounded icon box from the Figma notification list: white on an
 * unread (tinted) row, light gray on a read row.
 */
export const NotificationTypeIcon = ({
  type,
  relatedEntityType,
  isRead,
}: {
  type: NotificationType;
  relatedEntityType?: string | null;
  isRead: boolean;
}) => {
  const figma = FIGMA_ICONS[type];
  const Fallback =
    FALLBACK_ICONS[type] ??
    (relatedEntityType === "category" ? LayoutGrid : Bell);
  return (
    <span
      aria-hidden="true"
      className={twMerge(
        "grid size-10 shrink-0 place-content-center rounded-[14px] p-2",
        isRead ? "bg-[#F2F2F2]" : "bg-white",
      )}
    >
      {figma ? figma() : <Fallback className="size-5 text-[#1A1A1A]" />}
    </span>
  );
};
