"use client";

import { AppWrapper } from "@/components/app/shared/AppWrapper";
import { paymentTargetHref } from "@/components/app/payments/paymentTarget";
import { PaymentResultDialog } from "@/components/app/payments/PaymentResultDialog";
import { usePaymentResult } from "@/components/app/payments/usePaymentResult";
import { PaymentPurpose, PaymentStatus, type Payment } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { useSearchParams } from "next/navigation";

/**
 * S4-11: where every gateway checkout returns. Shows the BRD success or
 * failure pop-up once the gateway has confirmed the payment.
 */
export const PaymentReturnPage = () => {
  const dict = useDict();
  const paymentId = useSearchParams().get("paymentId");
  const { data: payment, isError, timedOut } = usePaymentResult(paymentId);

  const backLabel = (target: Payment) => {
    if (target.purpose === PaymentPurpose.Contract) {
      return dict.payments.contractDetails;
    }
    if (target.purpose === PaymentPurpose.PremiumAd) return dict.payments.myAds;
    return dict.payments.backToChat;
  };

  let dialog;
  if (!paymentId || isError) {
    dialog = (
      <PaymentResultDialog
        tone="failure"
        title={dict.payments.notFound}
        action={{ label: dict.payments.home, href: "/" }}
      />
    );
  } else if (!payment || payment.status === PaymentStatus.Pending) {
    dialog = timedOut ? (
      <PaymentResultDialog
        tone="waiting"
        title={dict.payments.timeoutTitle}
        description={dict.payments.timeoutDescription}
        action={
          payment
            ? { label: backLabel(payment), href: paymentTargetHref(payment) }
            : { label: dict.payments.home, href: "/" }
        }
      />
    ) : (
      <PaymentResultDialog
        tone="pending"
        title={dict.payments.pendingTitle}
        description={dict.payments.pendingDescription}
      />
    );
  } else if (payment.status === PaymentStatus.Completed) {
    dialog = (
      <PaymentResultDialog
        tone="success"
        title={dict.payments.successTitle}
        action={{ label: backLabel(payment), href: paymentTargetHref(payment) }}
      />
    );
  } else {
    dialog = (
      <PaymentResultDialog
        tone="failure"
        title={dict.payments.failureTitle}
        action={{
          label: dict.payments.tryAgain,
          href: paymentTargetHref(payment),
        }}
      />
    );
  }

  return (
    <AppWrapper>
      <main className="min-h-[60vh] bg-[#fcfdfe]">{dialog}</main>
    </AppWrapper>
  );
};
