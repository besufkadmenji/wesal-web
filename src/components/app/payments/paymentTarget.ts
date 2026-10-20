import { PaymentPurpose, type Payment } from "@/gql/graphql";

type PaymentTarget = Pick<
  Payment,
  "purpose" | "contractId" | "conversationId" | "listingId"
>;

/** Where the payer goes back to after checkout: what they were paying for. */
export const paymentTargetHref = (payment: PaymentTarget): string => {
  if (payment.purpose === PaymentPurpose.Contract && payment.contractId) {
    return `/contracts?contractId=${payment.contractId}`;
  }
  if (
    (payment.purpose === PaymentPurpose.ChatCustomer ||
      payment.purpose === PaymentPurpose.ChatProvider) &&
    payment.conversationId
  ) {
    return `/conversations/${payment.conversationId}`;
  }
  if (payment.purpose === PaymentPurpose.PremiumAd) return "/my-listings";
  return "/";
};
